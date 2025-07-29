const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./contact.db');

// Create table if not exists
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS contacts (
    name TEXT,
    email TEXT,
    message TEXT
  )`);
});

module.exports = db;
