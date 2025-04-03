const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");

// GET all orders
router.get("/", ordersController.getAllOrders);

// GET single order by ID
router.get("/:id", ordersController.getOrdersById);

// GET orders by product ID
router.get("/product/:product_id", ordersController.getOrdersByProductId);

// GET orders by date
router.get("/date/:date", ordersController.getOrdersByDate);

// POST new order
router.post("/", ordersController.createOrders);

// PATCH update order
router.patch("/:id", ordersController.updateOrders);

// DELETE order
router.delete("/:id", ordersController.deleteOrders);

// Export orders to CSV
router.get("/export", ordersController.exportOrders);

module.exports = router;
