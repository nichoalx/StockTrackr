const productsModel = require("../models/productsModel");
const fs = require("fs");
const { parse } = require("json2csv");

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await productsModel.getAllProducts();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
};

// Get order by ID
const getProductsById = async (req, res) => {
    try {
        const order = await productsModel.getProductsById(req.params.id);
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ error: "Products not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch order" });
    }
};

// Get products by date
const getProductsByDate = async (req, res) => {
    try {
        const products = await productsModel.getProductsByDate(req.params.date);
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
};

// Create an order
const createProducts = async (req, res) => {
    try {
        const { name, type, quantity } = req.body;
        await productsModel.createProducts(name, type, quantity);
        res.status(201).json({ message: "Products created successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to create order" });
    }
};

// Update an order
const updateProducts = async (req, res) => {
    try {
        const { name, type, quantity } = req.body;
        await productsModel.updateProducts(req.params.id, name, type, quantity);
        res.json({ message: "Products updated successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to update order" });
    }
};

// Delete an order
const deleteProducts = async (req, res) => {
    try {
        await productsModel.deleteProducts(req.params.id);
        res.json({ message: "Products deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete order" });
    }
};

// Export products to CSV
const exportProducts = async (req, res) => {
    try {
        const products = await productsModel.exportProducts();
        const csv = parse(products);
        fs.writeFileSync(`products_${date}.csv`, csv);
        res.download(`products_${date}.csv`);
    } catch (error) {
        res.status(500).json({ error: "Failed to export products" });
    }
};

module.exports = {
    getAllProducts,
    getProductsById,
    getProductsByDate,
    createProducts,
    updateProducts,
    deleteProducts,
    exportProducts
};
