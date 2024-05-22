const mongoose = require("mongoose");

const partyTypeSchema = new mongoose.Schema({
  typeName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const PartyType = mongoose.model("PartyType", partyTypeSchema);

module.exports = PartyType;
