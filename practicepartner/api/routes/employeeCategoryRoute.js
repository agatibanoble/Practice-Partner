// clientCategoryRoutes.js
const express = require("express");
const router = express.Router();
const {
  createEmployeeCategory,
  getAllEmployeeCategories,
  getEmployeeCategoryById,
  updateEmployeeCategoryById,
  deleteEmployeeCategoryById,
} = require("../controllers/employeeCategoryController");

// Routes for handling client category operations
router.get("/get", getAllEmployeeCategories);
router.get("/get/:id", getEmployeeCategoryById);
router.post("/create", createEmployeeCategory);
router.post("/update/:id", updateEmployeeCategoryById);
router.delete("/delete/:id", deleteEmployeeCategoryById);

module.exports = router;
