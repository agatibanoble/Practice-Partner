const mongoose = require("mongoose");

const dispatchSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  documentType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DocumentType",
    required: true,
  },
  dispatchNumber: {
    type: String,
    required: true,
  },
  dispatchStatus: {
    type: String,
    enum: ["Pending", "Dispatched", "Received", "Canceled", "Returned"],
    default: "Pending",
    required: true,
  },
  dispatchType: {
    type: String,
    enum: ["Out", "In"],
    default: "Out",
    required: true,
  },
  dispatchPriority: {
    type: String,
    enum: ["Urgent", "Normal", "Slow"],
    default: "Normal",
    required: true,
  },
  dispatchDate: {
    type: Date,
    required: false,
  },
  dispatchDueDate: {
    type: Date,
    required: false,
  },
  dispatchReceivedDate: {
    type: Date,
  },
  dispatchRecipient: {
    type: String,
  },
  dispatchSender: {
    type: String,
  },
  dispatchDeliveredBy: {
    type: String,
  },

  dispatchNotes: {
    type: String,
  },
});

const Dispatch = mongoose.model("Dispatch", dispatchSchema);

module.exports = Dispatch;
