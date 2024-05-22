const mongoose = require("mongoose");

const conferenceSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  case: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Case",
    required: false,
  },
  conferenceType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ConferenceType",
    required: false,
  },
  contactPersons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ContactPerson",
      required: true,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  startTime: {
    type: Date,
    default: Date.now,
  },
  endTime: {
    type: Date,
    default: Date.now,
  },
  topics: {
    type: [String],
    required: true,
  },
  notes: {
    type: String,
  },
});

const Conference = mongoose.model("Conference", conferenceSchema);

module.exports = Conference;
