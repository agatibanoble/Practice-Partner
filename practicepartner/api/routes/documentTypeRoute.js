// Import required modules
const express = require("express");
const router = express.Router();
const {
  createDocumentType,
  getAllDocumentTypes,
  getDocumentTypeById,
  updateDocumentTypeById,
  deleteDocumentTypeById,
} = require("../controllers/documentTypeController");

// Define routes for case categories
router.post("/create", createDocumentType); // Create a new case category
router.get("/get", getAllDocumentTypes); // Get all case categories
router.get("/get/:id", getDocumentTypeById); // Get a case category by ID
router.post("/update/:id", updateDocumentTypeById); // Update a case category by ID
router.delete("/delete/:id", deleteDocumentTypeById); // Delete a case category by ID

// Export the router
module.exports = router;
