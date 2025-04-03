const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

// GET all products
router.get("/", productsController.getAllProducts);

// GET single order by ID
router.get("/:id", productsController.getProductsById);

// GET products by date
router.get("/date/:date", productsController.getProductsByDate);

// POST new order
router.post("/", productsController.createProducts);

// PATCH update order
router.patch("/:id", productsController.updateProducts);

// DELETE order
router.delete("/:id", productsController.deleteProducts);

// Export products to CSV
router.get("/export", productsController.exportProducts);

module.exports = router;
