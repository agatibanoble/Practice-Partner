// clientCategoryRoutes.js
const express = require("express");
const router = express.Router();
const {
  createClientCategory,
  getAllClientCategories,
  getClientCategoryById,
  updateClientCategoryById,
  deleteClientCategoryById,
} = require("../controllers/clientCategoryController");

// Routes for handling client category operations
router.get("/get", getAllClientCategories);
router.get("/get/:id", getClientCategoryById);
router.post("/create", createClientCategory);
router.post("/update/:id", updateClientCategoryById);
router.delete("/delete/:id", deleteClientCategoryById);

module.exports = router;
