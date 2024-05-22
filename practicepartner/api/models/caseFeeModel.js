const mongoose = require("mongoose");

const caseFeeSchema = new mongoose.Schema({
  caseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Case",
    required: true,
  },
  feeTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FeeType",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    default: Date.now,
  },
});

const CaseFee = mongoose.model("CaseFee", caseFeeSchema);

module.exports = CaseFee;
