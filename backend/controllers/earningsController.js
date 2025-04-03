const earningsModel = require("../models/earningsModel");
const fs = require("fs");
const { parse } = require("json2csv");

// Get all earnings
const getAllEarnings = async (req, res) => {
    try {
        const earnings = await earningsModel.getAllEarnings();
        res.json(earnings);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch earnings" });
    }
};

// Get earnings by ID
const getEarningsById = async (req, res) => {
    try {
        const earning = await earningsModel.getEarningsById(req.params.id);
        if (earning) {
            res.json(earning);
        } else {
            res.status(404).json({ error: "Earning not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch earning" });
    }
};

// Get earnings by type
const getEarningsByType = async (req, res) => {
    try {
        const earning = await earningsModel.getEarningsByType(req.params.type);
        if (earning) {
            res.json(earning);
        } else {
            res.status(404).json({ error: "Earning not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch earning" });
    }
};

// Get earnings by date
const getEarningsByDate = async (req, res) => {
    try {
        const earning = await earningsModel.getEarningsByDate(req.params.date);
        if (earning) {
            res.json(earning);
        } else {
            res.status(404).json({ error: "Earning not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch earning" });
    }
};

// Create an earning
const createEarnings = async (req, res) => {
    try {
        const { type, amount, remarks } = req.body;
        await earningsModel.createEarnings(type, amount, remarks);
        res.status(201).json({ message: "Earning created successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to create earning" });
    }
};

// Update an earning
const updateEarnings = async (req, res) => {
    try {
        const { type, amount, remarks } = req.body;
        await earningsModel.updateEarnings(req.params.id, type, amount, remarks);
        res.json({ message: "Earning updated successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to update earning" });
    }
};

// Delete an order
const deleteEarnings = async (req, res) => {
    try {
        await earningsModel.deleteEarnings(req.params.id);
        res.json({ message: "Earning deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete earning" });
    }
};

// Export orders to CSV
const exportEarnings = async (req, res) => {
    try {
        const earnings = await earningsModel.exportEarnings();
        const csv = parse(earnings);
        const date = new Date().toISOString().split("T")[0]; // Get YYYY-MM-DD format
        fs.writeFileSync(`earnings_${date}.csv`, csv);
        res.download(`earnings_${date}.csv`);
    } catch (error) {
        res.status(500).json({ error: "Failed to export earnings" });
    }
};

module.exports = {
    getAllEarnings,
    getEarningsById,
    getEarningsByType,
    getEarningsByDate,
    createEarnings,
    updateEarnings,
    deleteEarnings,
    exportEarnings
};
