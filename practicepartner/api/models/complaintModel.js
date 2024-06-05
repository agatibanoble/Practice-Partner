const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const complaintSchema = new Schema({
  complaintTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dateFiled: {
    type: Date,
    default: Date.now,
  },
  complainant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved"],
    default: "Pending",
  },
});

const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;
