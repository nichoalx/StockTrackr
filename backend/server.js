require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Simple test route
app.get("/", (req, res) => {
    res.send("Inventory Management API is running!");
});

// Import and use routes
const ordersRoutes = require("./routes/orders.js");
const productsRoutes = require("./routes/products");
const earningsRoutes = require("./routes/earnings");

app.use("/orders", ordersRoutes);
app.use("/products", productsRoutes);
app.use("/earnings", earningsRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
