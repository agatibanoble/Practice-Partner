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

router.post("/create", createClient);
router.post("/update/:id", updateClientById);
router.get("/get", getAllClients);
router.get("/search", searchClients);
router.get("/get/:id", getClientById);
//router.get("/getClient/", getClientById);
router.delete("/delete/:id", deleteClientById);

module.exports = router;
