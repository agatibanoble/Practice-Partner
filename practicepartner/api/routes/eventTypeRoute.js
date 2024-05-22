const express = require("express");
const router = express.Router();
const {
  createEventType,
  getAllEventTypes,
  getEventTypeById,
  updateEventTypeById,
  deleteEventTypeById,
} = require("../controllers/eventTypeController");

// Create a new eventType
router.post("/createEventType", createEventType);

// Get all eventTypes
router.get("/getEventTypes", getAllEventTypes);

// Get an eventType by ID
router.get("/getEventTypeById/:id", getEventTypeById);

// Update an eventType by ID
router.put("/updateEventTypeById/:id", updateEventTypeById);

// Delete an eventType by ID
router.delete("/deleteEventTypeById/:id", deleteEventTypeById);

module.exports = router;
