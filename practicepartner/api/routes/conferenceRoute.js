const express = require("express");
const router = express.Router();
const {
  createConference,
  getAllConferences,
  getConferenceById,
  updateConferenceById,
  deleteConferenceById,
} = require("../controllers/conferenceController");

// Create a new conference
router.post("/createConference", createConference);

// Get all conferences
router.get("/clients/:clientId/conferences", getAllConferences);

// Get a conference by ID
router.get("/getConferenceById/:id", getConferenceById);

// Update a conference by ID
router.post("/updateConference/:id", updateConferenceById);

// Delete a conference by ID
router.delete("/deleteConferenceById/:id", deleteConferenceById);

module.exports = router;
