// Import required modules
const express = require("express");
const router = express.Router();
const {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartmentById,
  deleteDepartmentById,
} = require("../controllers/departmentController");

// Define routes for case categories
router.post("/create", createDepartment); // Create a new case category
router.get("/get", getAllDepartments); // Get all case categories
router.get("/get/:id", getDepartmentById); // Get a case category by ID
router.post("/update/:id", updateDepartmentById); // Update a case category by ID
router.delete("/delete/:id", deleteDepartmentById); // Delete a case category by ID

// Export the router
module.exports = router;
