const express = require("express");
const router = express.Router();
const {
  createCaseConference,
  getSelectedCaseConferences,
  getAllCaseConferences,
  getCaseConferenceById,
  updateCaseConferenceById,
  deleteCaseConferenceById,
} = require("../controllers/caseConferenceController");

// Create a new conference
router.post("/create", createCaseConference);
// Get all conferences
router.get("/case/:caseId/get/", getSelectedCaseConferences);
// Get all conferences
router.get("/get", getAllCaseConferences);

// Get a conference by ID
router.get("/get/:id", getCaseConferenceById);

// Update a conference by ID
router.post("/update/:id", updateCaseConferenceById);

// Delete a conference by ID
router.delete("/delete/:id", deleteCaseConferenceById);

module.exports = router;
