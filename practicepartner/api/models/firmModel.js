const mongoose = require("mongoose");

const lawFirmSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
  },
  firmName: {
    type: String,
  },
  dateEstablished: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  region: {
    type: mongoose.Schema.Types.ObjectId,
  },
  postalCode: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  website: {
    type: String,
  },
  description: {
    type: String,
  },
});

const LawFirm = mongoose.model("LawFirm", lawFirmSchema);

module.exports = LawFirm;
