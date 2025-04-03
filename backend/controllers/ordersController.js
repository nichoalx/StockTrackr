const ordersModel = require("../models/ordersModel");
const fs = require("fs");
const { parse } = require("json2csv");

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await ordersModel.getAllOrders();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
};

// Get order by ID
const getOrdersById = async (req, res) => {
    try {
        const order = await ordersModel.getOrdersById(req.params.id);
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ error: "Orders not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch order" });
    }
};

// Get orders by product ID
const getOrdersByProductId = async (req, res) => {
    try {
        const orders = await ordersModel.getOrdersByProductId(req.params.product_id);
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
};

// Get orders by date
const getOrdersByDate = async (req, res) => {
    try {
        const orders = await ordersModel.getOrdersByDate(req.params.date);
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
};

// Create an order
const createOrders = async (req, res) => {
    try {
        const { product_id, quantity, comments } = req.body;
        await ordersModel.createOrders(product_id, quantity, comments);
        res.status(201).json({ message: "Orders created successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to create order" });
    }
};

// Update an order
const updateOrders = async (req, res) => {
    try {
        const { product_id, quantity, comments } = req.body;
        await ordersModel.updateOrders(req.params.id, product_id, quantity, comments);
        res.json({ message: "Orders updated successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to update order" });
    }
};

// Delete an order
const deleteOrders = async (req, res) => {
    try {
        await ordersModel.deleteOrders(req.params.id);
        res.json({ message: "Orders deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete order" });
    }
};

// Export orders to CSV
const exportOrders = async (req, res) => {
    try {
        const orders = await ordersModel.exportOrders();
        const csv = parse(orders);
        fs.writeFileSync(`orders_${date}.csv`, csv);
        res.download(`orders_${date}.csv`);
    } catch (error) {
        res.status(500).json({ error: "Failed to export orders" });
    }
};

module.exports = {
    getAllOrders,
    getOrdersById,
    getOrdersByProductId,
    getOrdersByDate,
    createOrders,
    updateOrders,
    deleteOrders,
    exportOrders
};
