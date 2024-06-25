const mongoose = require("mongoose");

const caseConferenceSchema = new mongoose.Schema({
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
  caseConferenceDate: {
    type: Date,
    default: Date.now,
  },
  caseConferenceStartTime: {
    type: Date,
    default: Date.now,
  },
  caseConferenceEndTime: {
    type: Date,
    default: Date.now,
  },
  caseConferenceTopic: {
    type: String,
    required: false,
  },
  caseConferenceNote: {
    type: String,
  },
});

const CaseConference = mongoose.model("CaseConference", caseConferenceSchema);

module.exports = CaseConference;
