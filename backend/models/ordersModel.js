const db = require("../db/db");

// Get all orders
const getAllOrders = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM orders", (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

// Get order by ID
const getOrdersById = (id) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM orders WHERE id = ?", [id], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

// Get orders by product ID
const getOrdersByProductId = (product_id) => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM orders WHERE product_id = ?", [product_id], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

// Get orders by date
const getOrdersByDate = (date) => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM orders WHERE date = ?", [date], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

// Create a new order
const createOrders = (product_id, quantity, comments) => {
    return new Promise((resolve, reject) => {
        db.run(
            "INSERT INTO orders (product_id, quantity, comments) VALUES (?, ?, ?)",
            [product_id, quantity, comments],
            function (err) {
                if (err) reject(err);
                else resolve({ id: this.lastID }); // Return the ID of the new order
            }
        );
    });
};

// Update an order
const updateOrders = (id, product_id, quantity, comments) => {
    return new Promise((resolve, reject) => {
        db.run(
            "UPDATE orders SET product_id = ?, quantity = ?, comments = ? WHERE id = ?",
            [product_id, quantity, comments, id],
            function (err) {
                if (err) reject(err);
                else resolve({ changes: this.changes }); // Number of rows updated
            }
        );
    });
};

// Delete an order
const deleteOrders = (id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM orders WHERE id = ?", [id], function (err) {
            if (err) reject(err);
            else resolve({ changes: this.changes }); // Number of rows deleted
        });
    });
};

// Export orders to CSV
const exportOrders = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM orders", (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

module.exports = {
    getAllOrders,
    getOrdersById,
    getOrdersByProductId,
    getOrdersByDate,
    createOrders,
    updateOrders,
    deleteOrders,
    exportOrders,
};
