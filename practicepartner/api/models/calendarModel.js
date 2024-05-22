const mongoose = require("mongoose");

const calendarSchema = new mongoose.Schema({
  caseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "case", // Reference to the case model
    required: false,
  },
  calendateStartDate: {
    type: Date,
    required: true,
  },
  calendateEndDate: {
    type: Date,
    required: true,
  },
  eventType: {
    type: String,
    enum: ["Meeting", "Appointment", "Deadline", "Holiday", "Other"],
    required: true,
  },
  schedule: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  googleEventId: {
    type: String, // Unique event ID from Google Calendar
  },
  googleCalendarId: {
    type: String, // ID of the Google Calendar
  },
});

const Calendar = mongoose.model("Calendar", calendarSchema);

module.exports = Calendar;
