const express = require("express");
const router = express.Router();
const {
  createCaseFee,
  getAllCaseFees,
  getCaseFeeById,
  updateCaseFeeById,
  deleteCaseFeeById,
} = require("../controllers/caseFeeController");

// Create a new case fee
router.post("/createCaseFee", createCaseFee);

// Get all case fees
router.get("/getCaseFees", getAllCaseFees);

// Get a case fee by ID
router.get("/getCaseFeeById/:id", getCaseFeeById);

// Update a case fee by ID
router.put("/updateCaseFeeById/:id", updateCaseFeeById);

// Delete a case fee by ID
router.delete("/deleteCaseFeeById/:id", deleteCaseFeeById);

module.exports = router;
