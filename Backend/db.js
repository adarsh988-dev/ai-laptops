const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.resolve(__dirname, 'products.db'), (err) => {
  if (err) console.error('Database connection error:', err.message);
  else console.log('Connected to the SQLite database.');
});

// Run table creation if not exists
db.run(`CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  category TEXT,
  originalPrice REAL,
  price REAL,
  rating INTEGER,
  image TEXT,
  hoverImage TEXT,
  sale INTEGER,
  inStock INTEGER,
  brand TEXT,
  description TEXT
)`);

module.exports = db;