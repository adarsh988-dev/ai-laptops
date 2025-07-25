const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/products', productRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
