const express = require("express");
const router = express.Router();
const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
} = require("../controllers/employeeController");

// Create a new employee
router.post("/create", createEmployee);

// Get all employees
router.get("/get", getAllEmployees);

// Get a employee by ID
router.get("/get/:id", getEmployeeById);

// Update a employee by ID
router.put("/update/:id", updateEmployeeById);

// Delete a employee by ID
router.delete("/delete/:id", deleteEmployeeById);

module.exports = router;
