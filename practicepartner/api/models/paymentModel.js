const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  caseFeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CaseFee", // Reference to the Fee model
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paidBy: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
