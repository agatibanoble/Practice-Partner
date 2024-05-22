const mongoose = require("mongoose");

const conferenceTypeSchema = new mongoose.Schema(
  {
    conferenceTypeName: {
      type: String,
      required: true,
      // unique: true, // Ensures that each category name is unique
    },
    conferenceTypeDescription: {
      type: String,
      // default: "", // Default value if description is not provided
    },
  },
  { timestamps: true }
);

const ConferenceType = mongoose.model("ConferenceType", conferenceTypeSchema);

module.exports = ConferenceType;
