const express = require("express");
const router = express.Router();
const {
  createContactAddress,
  getAllContactAddresses,
  getContactAddressById,
  updateContactAddressById,
  deleteContactAddressById,
} = require("../controllers/contactAddressController");

// Create a new client Client
router.post("/createContactAddress", createContactAddress);

// Get all client Clients
router.get("/clients/:clientId/addresses", getAllContactAddresses);
//router.get("/clients/:clientId/addresses", getAllContactAddresses);
// Get a client Client by ID
router.get("/getContactAddress/:id", getContactAddressById);

// Update a client Client by ID
router.post("/updateContactAddress/:id", updateContactAddressById);

// Delete a client Client by ID
router.delete("/deleteContactAddress/:id", deleteContactAddressById);

module.exports = router;
