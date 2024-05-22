const express = require("express");
const router = express.Router();
const {
  createCalendarEvent,
  getAllCalendarEvents,
  getCalendarEventById,
  updateCalendarEventById,
  deleteCalendarEventById,
} = require("../controllers/calendarController");

// Create a new calendar
router.post("/createCalendarEvent", createCalendarEvent);

// Get all calendars
router.get("/getCalendarEvents", getAllCalendarEvents);

// Get a calendar by ID
router.get("/getCalendarEventById/:id", getCalendarEventById);

// Update a calendar by ID
router.put("/updateCalendarEventById/:id", updateCalendarEventById);

// Delete a calendar by ID
router.delete("/updateCalendarEventById/:id", deleteCalendarEventById);

module.exports = router;
