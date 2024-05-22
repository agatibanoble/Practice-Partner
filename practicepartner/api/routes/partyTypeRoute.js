const express = require("express");
const router = express.Router();
const {
  createPartyType,
  getAllPartyTypes,
  getPartyTypeById,
  updatePartyTypeById,
  deletePartyTypeById,
} = require("../controllers/partyTypeController");

// Create a new party type
router.post("/createPartyType", createPartyType);

// Get all party types
router.get("/getPartyTypes", getAllPartyTypes);

// Get a party type by ID
router.get("/getPartyTypeById/:id", getPartyTypeById);

// Update a party type by ID
router.put("/updatePartyTypeById/:id", updatePartyTypeById);

// Delete a party type by ID
router.delete("/deletePartyTypeById/:id", deletePartyTypeById);

module.exports = router;
