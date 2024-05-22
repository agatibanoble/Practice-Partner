const express = require("express");
const router = express.Router();
const {
  createCaseEvent,
  getAllCaseEvents,
  getCaseEventById,
  updateCaseEventById,
  deleteCaseEventById,
} = require("../controllers/caseEventController");

// Create a new case event
router.post("/createCaseEvent", createCaseEvent);

// Get all case events
router.get("/getCaseEvents", getAllCaseEvents);

// Get a case event by ID
router.get("/getCaseEventById/:id", getCaseEventById);

// Update a case event by ID
router.put("/updateCaseEventById/:id", updateCaseEventById);

// Delete a case event by ID
router.delete("/deleteCaseEventById/:id", deleteCaseEventById);

module.exports = router;
