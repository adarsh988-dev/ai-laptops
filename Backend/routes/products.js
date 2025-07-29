const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();

// AWS S3 Client (v3)
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Multer for temporary local file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

async function uploadToS3(file) {
  const date = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
  const s3Key = `${date}_${file.originalname}`;
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: s3Key,
    Body: file.buffer, // ✅ THIS IS CORRECT FOR memoryStorage
    ContentType: file.mimetype,
  });

  await s3.send(command);
  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`;
}

function saveToFrontendAssets(file) {
  const date = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
  const fileName = `${date}_${file.originalname}`;
  const localPath = path.join(__dirname, '..', '..', 'Frontend', 'public', 'uploads', fileName);

  fs.writeFileSync(localPath, file.buffer);

  // Path to be saved in the database (frontend-friendly)
  return `${fileName}`;
}

// Add product
router.post('/add', upload.fields([{ name: 'primaryImage' }, { name: 'hoverImage' }]), async (req, res) => {
  try {
    const {
      name,
      category,
      originalPrice,
      price,
      rating,
      sale,
      inStock,
      brand,
      description,
    } = req.body;

    const primaryFile = req.files?.primaryImage?.[0];
    const hoverFile = req.files?.hoverImage?.[0];

    let imageUrl = '';
    let hoverImageUrl = '';

    if (primaryFile) {
      await uploadToS3(primaryFile);
      imageUrl = saveToFrontendAssets(primaryFile); // <-- store local path
    }

    if (hoverFile) {
      await uploadToS3(hoverFile);
      hoverImageUrl = saveToFrontendAssets(hoverFile); // <-- store local path
    }

    db.run(
      `INSERT INTO products 
      (name, category, originalPrice, price, rating, image, hoverImage, sale, inStock, brand, description) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        category,
        originalPrice,
        price,
        rating,
        imageUrl,
        hoverImageUrl,
        sale ? 1 : 0,
        inStock ? 1 : 0,
        brand,
        description,
      ],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });

        const insertedId = this.lastID;
        db.get(`SELECT * FROM products WHERE id = ?`, [insertedId], (err, row) => {
          if (err) return res.status(500).json({ error: 'Failed to fetch new product' });
          res.json({ message: 'Product added', product: row });
        });
      }
    );
  } catch (error) {
    console.error('Upload failed', error);
    res.status(500).json({ error: 'File upload failed' });
  }
});

async function deleteFromS3(fileUrl) {
  if (!fileUrl) return;

  const parts = fileUrl.split('/');
  const key = parts[parts.length - 1]; // get filename from S3 URL

  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  });

  try {
    await s3.send(command);
    console.log(`Deleted from S3: ${key}`);
  } catch (err) {
    console.error(`S3 deletion failed for ${key}:`, err.message);
  }
}

// Helper to delete from local folder
function deleteFromLocal(imagePath) {
  const fullPath = path.join(__dirname, '..', '..', 'Frontend', 'public', 'uploads', imagePath);
  fs.unlink(fullPath, (err) => {
    if (err && err.code !== 'ENOENT') {
      console.error(`Failed to delete local file ${fullPath}:`, err.message);
    } else {
      console.log(`Deleted local image: ${fullPath}`);
    }
  });
}

router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;

  // Step 1: Get product first
  db.get('SELECT image, hoverImage FROM products WHERE id = ?', [id], async (err, row) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch product' });

    if (!row) return res.status(404).json({ message: 'Product not found' });

    const { image, hoverImage } = row;

    // Step 2: Delete local files (if they exist)
    if (image) deleteFromLocal(image);
    if (hoverImage) deleteFromLocal(hoverImage);

    // Step 3: Delete from S3 (if applicable)
    await deleteFromS3(image);
    await deleteFromS3(hoverImage);

    // Step 4: Delete from database
    db.run('DELETE FROM products WHERE id = ?', [id], function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.json({ message: this.changes ? 'Deleted' : 'Not Found' });
    });
  });
});

router.patch('/update/:id', upload.fields([{ name: 'primaryImage' }, { name: 'hoverImage' }]), async (req, res) => {
  const { id } = req.params;

  const {
    name,
    category,
    originalPrice,
    price,
    rating,
    sale,
    inStock,
    brand,
    description,
  } = req.body;

  const primaryFile = req.files?.primaryImage?.[0];
  const hoverFile = req.files?.hoverImage?.[0];

  try {
    // Step 1: Get existing image paths from DB
    db.get('SELECT image, hoverImage FROM products WHERE id = ?', [id], async (err, row) => {
      if (err) return res.status(500).json({ error: 'Failed to fetch product' });
      if (!row) return res.status(404).json({ message: 'Product not found' });

      let imagePath = row.image;
      let hoverImagePath = row.hoverImage;

      // Step 2: Handle primary image update
      if (primaryFile) {
        await deleteFromS3(imagePath);
        deleteFromLocal(imagePath);
        await uploadToS3(primaryFile);
        imagePath = saveToFrontendAssets(primaryFile);
      }

      // Step 3: Handle hover image update
      if (hoverFile) {
        await deleteFromS3(hoverImagePath);
        deleteFromLocal(hoverImagePath);
        await uploadToS3(hoverFile);
        hoverImagePath = saveToFrontendAssets(hoverFile);
      }

      // Step 4: Update in DB
      db.run(
        `UPDATE products 
         SET name = ?, category = ?, originalPrice = ?, price = ?, rating = ?, 
             image = ?, hoverImage = ?, sale = ?, inStock = ?, brand = ?, description = ?
         WHERE id = ?`,
        [
          name,
          category,
          originalPrice,
          price,
          rating,
          imagePath,
          hoverImagePath,
          sale ? 1 : 0,
          inStock ? 1 : 0,
          brand,
          description,
          id,
        ],
        function (err) {
          if (err) return res.status(500).json({ error: err.message });
          db.get(`SELECT * FROM products WHERE id = ?`, [id], (err, row) => {
            if (err) return res.status(500).json({ error: 'Failed to fetch new product' });
            res.json({ message: 'Product Updated', product: row });
          });
        }
      );
    });
  } catch (error) {
    console.error('Update failed', error);
    res.status(500).json({ error: 'Update failed' });
  }
});


// Get all products
router.get('/all', (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ products: rows });
  });
});

module.exports = router;
