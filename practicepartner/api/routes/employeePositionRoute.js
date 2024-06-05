// clientCategoryRoutes.js
const express = require("express");
const router = express.Router();
const {
  createEmployeePosition,
  getAllEmployeePositions,
  getEmployeePositionById,
  updateEmployeePositionById,
  deleteEmployeePositionById,
} = require("../controllers/employeePositionController");

// Routes for handling client category operations
router.get("/get", getAllEmployeePositions);
router.get("/get/:id", getEmployeePositionById);
router.post("/create", createEmployeePosition);
router.post("/update/:id", updateEmployeePositionById);
router.delete("/delete/:id", deleteEmployeePositionById);

module.exports = router;
