const express = require("express");
const router = express.Router();
const {
  createFeeType,
  getAllFeeTypes,
  getFeeTypeById,
  updateFeeTypeById,
  deleteFeeTypeById,
} = require("../controllers/feeTypeController");

// Create a new fee type
router.post("/createFeeType", createFeeType);

// Get all fee types
router.get("/getFeeTypes", getAllFeeTypes);

// Get a fee type by ID
router.get("/getFeeTypeById/:id", getFeeTypeById);

// Update a fee type by ID
router.put("/updateFeeTypeById/:id", updateFeeTypeById);

// Delete a fee type by ID
router.delete("/deleteFeeTypeById/:id", deleteFeeTypeById);

module.exports = router;
