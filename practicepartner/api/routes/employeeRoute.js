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
router.post("/createEmployee", createEmployee);

// Get all employees
router.get("/getEmployees", getAllEmployees);

// Get a employee by ID
router.get("/getEmployeeById/:id", getEmployeeById);

// Update a employee by ID
router.put("/updateEmployeeById/:id", updateEmployeeById);

// Delete a employee by ID
router.delete("/deleteEmployeeById/:id", deleteEmployeeById);

module.exports = router;
