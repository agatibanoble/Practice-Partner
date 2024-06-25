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
    enum: ["Pending", "Dispatched", "Received", "Cancelled", "Returned"],
    default: "Pending",
    required: true,
  },
  dispatchType: {
    type: String,
    enum: ["outbound", "inbound"],
    default: "outbound",
    required: true,
  },
  dispatchPriority: {
    type: String,
    enum: ["Urgent", "High", "Normal", "Low"],
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
  dispatchDestinationAddress: {
    type: String,
  },
  dispatchSourceAddress: {
    type: String,
  },
  dispatchDeliveredBy: {
    type: String,
  },
  deliveryType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DeliveryType",
    required: true,
  },
  dispatchNote: {
    type: String,
  },
});

const Dispatch = mongoose.model("Dispatch", dispatchSchema);

module.exports = Dispatch;
