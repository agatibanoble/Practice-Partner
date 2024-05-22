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
router.post("/createCase", createCase);

// Get all cases
router.get("/getCases", getAllCases);

router.get("client/:clientId/cases", getClientCases);

// Get a case by ID
router.get("/getCase/:id", getCaseById);

// Update a case by ID
router.post("/updateCase/:id", updateCaseById);

// Delete a case by ID
router.delete("/deleteCase/:id", deleteCaseById);

module.exports = router;
