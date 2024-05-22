const express = require("express");
const router = express.Router();
const {
  createContactPerson,
  getAllContactPersons,
  getContactPersonById,
  updateContactPersonById,
  deleteContactPersonById,
} = require("../controllers/contactPersonController");

// Create a new cContactPerson
router.post("/createContactPerson", createContactPerson);

// Get all cContactPersons
router.get("/clients/:clientId/contactPersons/", getAllContactPersons);

// Get a cContactPerson by ID
router.get("/getContactPerson/:id", getContactPersonById);

// Update a cContactPerson by ID
router.post("/updateContactPerson/:id", updateContactPersonById);

// Delete a cContactPerson by ID
router.delete("/deleteContactPerson/:id", deleteContactPersonById);

module.exports = router;
