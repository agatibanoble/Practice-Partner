// Import required modules
const express = require("express");
const router = express.Router();
const {
  createCaseCategory,
  getAllCaseCategories,
  getCaseCategoryById,
  updateCaseCategoryById,
  deleteCaseCategoryById,
} = require("../controllers/caseCategoryController");

// Define routes for case categories
router.post("/create", createCaseCategory); // Create a new case category
router.get("/get", getAllCaseCategories); // Get all case categories
router.get("/get/:id", getCaseCategoryById); // Get a case category by ID
router.post("/update/:id", updateCaseCategoryById); // Update a case category by ID
router.delete("/delete/:id", deleteCaseCategoryById); // Delete a case category by ID

// Export the router
module.exports = router;
