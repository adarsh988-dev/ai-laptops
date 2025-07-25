const express = require('express');
const router = express.Router();
const db = require('../db');

// ➕ Add Product
router.post('/add', (req, res) => {
  const {
    name,
    category,
    originalPrice,
    price,
    rating,
    image,
    hoverImage,
    sale,
    inStock,
    brand
  } = req.body;

  db.run(
    `INSERT INTO products 
    (name, category, originalPrice, price, rating, image, hoverImage, sale, inStock, brand) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, category, originalPrice, price, rating, image, hoverImage, sale ? 1 : 0, inStock ? 1 : 0, brand],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Product added', id: this.lastID });
    }
  );
});

// 🗑️ Delete Product
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM products WHERE id = ?', id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: this.changes ? 'Deleted' : 'Not Found' });
  });
});

// ✏️ Update Product
router.patch('/update/:id', (req, res) => {
  const {
    name,
    category,
    originalPrice,
    price,
    rating,
    image,
    hoverImage,
    sale,
    inStock,
    brand
  } = req.body;
  const { id } = req.params;

  db.run(
    `UPDATE products 
     SET name = ?, category = ?, originalPrice = ?, price = ?, rating = ?, 
         image = ?, hoverImage = ?, sale = ?, inStock = ?, brand = ?
     WHERE id = ?`,
    [name, category, originalPrice, price, rating, image, hoverImage, sale ? 1 : 0, inStock ? 1 : 0, brand, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: this.changes ? 'Updated' : 'Not Found' });
    }
  );
});

router.get('/all', (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ products: rows });
  });
});

module.exports = router;
