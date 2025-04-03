const db = require("../db/db");

// Get all earnings
const getAllEarnings = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM earnings", (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

// Get earnings by ID
const getEarningsById = (id) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM earnings WHERE id = ?", [id], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

// Get earnings by type
const getEarningsByType = (type) => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM earnings WHERE type = ?", [type], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

// Get earnings by date
const getEarningsByDate = (date) => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM earnings WHERE date = ?", [date], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

// Create a new earnings entry
const createEarnings = (type, amount, remarks) => {
    return new Promise((resolve, reject) => {
        db.run(
            "INSERT INTO earnings (type, amount, remarks) VALUES (?, ?, ?)",
            [type, amount, remarks],
            function (err) {
                if (err) reject(err);
                else resolve({ id: this.lastID }); // Return the ID of the new earnings record
            }
        );
    });
};

// Update earnings entry
const updateEarnings = (id, type, amount, remarks) => {
    return new Promise((resolve, reject) => {
        db.run(
            "UPDATE earnings SET type = ?, amount = ?, remarks = ? WHERE id = ?",
            [type, amount, remarks, id],
            function (err) {
                if (err) reject(err);
                else resolve({ changes: this.changes }); // Number of rows updated
            }
        );
    });
};

// Delete an earnings entry
const deleteEarnings = (id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM earnings WHERE id = ?", [id], function (err) {
            if (err) reject(err);
            else resolve({ changes: this.changes }); // Number of rows deleted
        });
    });
};

// Export earnings to CSV
const exportEarnings = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM earnings", (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

module.exports = {
    getAllEarnings,
    getEarningsById,
    getEarningsByType,
    getEarningsByDate,
    createEarnings,
    updateEarnings,
    deleteEarnings,
    exportEarnings,
};
