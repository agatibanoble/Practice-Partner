const express = require("express");
const router = express.Router();
const {
  createCase,
  getAllCases,
  getCaseById,
  updateCaseById,
  deleteCaseById,
  getClientCases,
} = require("../controllers/caseController");

// Create a new case
router.post("/create", createCase);

// Get all cases
router.get("/get", getAllCases);

router.get("client/:clientId/cases", getClientCases);

// Get a case by ID
router.get("/get/:id", getCaseById);

// Update a case by ID
router.post("/update/:id", updateCaseById);

// Delete a case by ID
router.delete("/delete/:id", deleteCaseById);

module.exports = router;
