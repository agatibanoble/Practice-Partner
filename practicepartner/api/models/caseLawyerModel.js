const mongoose = require("mongoose");

// Define Countryt Schema
const caseLawyerSchema = new mongoose.Schema({
  caseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Case",
    required: true,
  },
  lawyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lawyer",
    required: true,
  },
  // You can add more properties as needed, like population, area, etc.
});

// Create Countryt model
const CaseLawyer = mongoose.model("CaseLawyer", caseLawyerSchema);

module.exports = CaseLawyer;
