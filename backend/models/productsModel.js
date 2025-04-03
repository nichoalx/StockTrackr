const db = require("../db/db");

// Get all products
const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM products", (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

// Get product by ID
const getProductsById = (id) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

// Get products by type
const getProductsByType = (type) => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM products WHERE type = ?", [type], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

// Create a new product
const createProducts = (name, type, quantity) => {
    return new Promise((resolve, reject) => {
        db.run(
            "INSERT INTO products (name, type, quantity) VALUES (?, ?, ?)",
            [name, type, quantity],
            function (err) {
                if (err) reject(err);
                else resolve({ id: this.lastID }); // Return the ID of the new product
            }
        );
    });
};

// Update a product
const updateProducts = (id, name, type, quantity) => {
    return new Promise((resolve, reject) => {
        db.run(
            "UPDATE products SET name = ?, type = ?, quantity = ? WHERE id = ?",
            [name, type, quantity, id],
            function (err) {
                if (err) reject(err);
                else resolve({ changes: this.changes }); // Number of rows updated
            }
        );
    });
};

// Delete a product
const deleteProducts = (id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM products WHERE id = ?", [id], function (err) {
            if (err) reject(err);
            else resolve({ changes: this.changes }); // Number of rows deleted
        });
    });
};

// Export products to CSV
const exportProducts = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM products", (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

module.exports = {
    getAllProducts,
    getProductsById,
    getProductsByType,
    createProducts,
    updateProducts,
    deleteProducts,
    exportProducts,
};
