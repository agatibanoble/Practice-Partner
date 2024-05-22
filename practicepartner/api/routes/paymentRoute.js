const express = require("express");
const router = express.Router();
const {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
} = require("../controllers/paymentController");

// Create a new payment
router.post("/createPayment", createPayment);

// Get all payments
router.get("/getPayments", getAllPayments);

// Get a payment by ID
router.get("/getPaymentById/:id", getPaymentById);

// Update a payment by ID
router.put("/updatePaymentById/:id", updatePaymentById);

// Delete a payment by ID
router.delete("/deletePaymentById/:id", deletePaymentById);

module.exports = router;
