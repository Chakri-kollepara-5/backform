const Database = require('better-sqlite3');
const db = new Database('./data.db');

// Create table if not exists
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS contacts (
    name TEXT,
    email TEXT,
    message TEXT
  )`);
});

module.exports = db;
