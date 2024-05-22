const express = require("express");
const router = express.Router();
const {
  createCaseParty,
  getAllCaseParties,
  getCasePartyById,
  updateCasePartyById,
  deleteCasePartyById,
} = require("../controllers/casePartyController");

// Create a new case party
router.post("/createCaseParty", createCaseParty);

// Get all case parties
router.get("/getCaseParties", getAllCaseParties);

// Get a case party by ID
router.get("/getCasePartyById/:id", getCasePartyById);

// Update a case party by ID
router.put("/updateCasePartyById/:id", updateCasePartyById);

// Delete a case party by ID
router.delete("/deleteCasePartyById/:id", deleteCasePartyById);

module.exports = router;
