// db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./products.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    category TEXT,
    originalPrice REAL,
    price REAL,
    rating INTEGER,
    image TEXT,
    hoverImage TEXT,
    sale BOOLEAN,
    inStock BOOLEAN,
    brand TEXT
  )`);
});

module.exports = db;
