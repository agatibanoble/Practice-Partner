const express = require("express");
const router = express.Router();
const {
  createFirm,
  getAllFirms,
  getFirmById,
  updateFirmById,
  deleteFirmById,
} = require("../controllers/firmController");

// Create a new law Firm
router.post("/create", createFirm);

// Get all law Firms
router.get("/get", getAllFirms);

// Get a law Firm by ID
router.get("/get/:id", getFirmById);

// Update a law Firm by ID
router.post("/update/:id", updateFirmById);

// Delete a law Firm by ID
router.delete("/delete/:id", deleteFirmById);

module.exports = router;
