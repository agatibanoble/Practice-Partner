const mongoose = require("mongoose");

const caseEventSchema = new mongoose.Schema({
  caseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Case",
    required: true,
  },
  eventTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EventType", // Reference to the EventType model
    required: true,
  },
  dateTime: {
    type: Date,
    default: Date.now,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const CaseEvent = mongoose.model("CaseEvent", caseEventSchema);

module.exports = CaseEvent;
