const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const visitSchema = new Schema({
  visitorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Visitor",
    required: true,
  },
  visitDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  checkInTime: {
    type: Date,
    default: Date.now,
  },
  checkOutTime: {
    type: Date,
  },
});

const Visit = mongoose.model("Visit", visitSchema);

module.exports = Visit;
