const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db/database.sqlite", (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("Connected to the SQLite database.");
    }
});

// Create Products Table
db.run(
    `CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT DEFAULT NULL,
        quantity INTEGER NOT NULL
    )`
);

// Create Orders Table
db.run(
    `CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER,
        quantity INTEGER NOT NULL,
        date TEXT DEFAULT CURRENT_TIMESTAMP,
        comments TEXT DEFAULT NULL,
        FOREIGN KEY (product_id) REFERENCES products(id)
    )`
);

// Create Earnings Table
db.run(
    `CREATE TABLE IF NOT EXISTS earnings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT CHECK(type IN ('Cash In', 'Cash Out')) NOT NULL,
        amount REAL NOT NULL,
        remarks TEXT DEFAULT NULL,
        date TEXT DEFAULT CURRENT_TIMESTAMP
    )`
);

module.exports = db;
