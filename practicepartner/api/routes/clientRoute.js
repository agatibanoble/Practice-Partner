// app.js
const express = require("express");
const router = express.Router();
const {
  createClient,
  getAllClients,
  searchClients,
  getClientById,
  updateClientById,
  deleteClientById,
} = require("../controllers/clientController");

// Routes for handling client operations

router.post("/createClient", createClient);
router.post("/updateClient/:id", updateClientById);
router.get("/getClients", getAllClients);
router.get("/searchClients", searchClients);
router.get("/getClient/:id", getClientById);
router.get("/getClient/", getClientById);
router.delete("/deleteClient/:id", deleteClientById);

module.exports = router;
