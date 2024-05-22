// app.js
const express = require("express");
const router = express.Router();
const {
  renderClientListPage,
  renderClientManagementPage,
  renderEditClientPage,
} = require("../controllers/clientController");

// Routes for handling client operations
router.get("/listClients", renderClientListPage);
router.get("/manageClient/:id", renderClientManagementPage);
router.get("/editClient/:id", renderEditClientPage);

module.exports = router;
