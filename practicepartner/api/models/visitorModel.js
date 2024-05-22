const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  company: {
    type: String,
  },
});

const Visitor = mongoose.model("Visitor", visitorSchema);

module.exports = Visitor;
