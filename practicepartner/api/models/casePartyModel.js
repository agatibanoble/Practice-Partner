const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const casePartySchema = new Schema({
  caseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Case",
    required: true,
  },
  partyName: {
    type: String,
    required: true,
  },
  partyType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PartyType", // Reference to the PartyType model
    required: true,
  },
  interest: {
    type: String,
    required: true,
  },
});

const CaseParty = mongoose.model("CaseParty", casePartySchema);

module.exports = CaseParty;
