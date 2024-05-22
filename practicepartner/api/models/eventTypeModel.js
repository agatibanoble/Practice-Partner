const mongoose = require("mongoose");

const eventTypeSchema = new mongoose.Schema({
  eventTypeName: {
    type: String,
    required: true,
  },
  eventTypeDescription: {
    type: String,
  },
});

const EventType = mongoose.model("EventType", eventTypeSchema);

module.exports = EventType;
