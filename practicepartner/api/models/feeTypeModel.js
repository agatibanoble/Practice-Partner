const mongoose = require("mongoose");

const feeTypeSchema = new mongoose.Schema({
  feeTypeName: {
    type: String,
    required: true,
    unique: true,
  },
  feeTypeDescription: {
    type: String,
    required: true,
    unique: true,
  },
});

const FeeType = mongoose.model("FeeType", feeTypeSchema);

module.exports = FeeType;
