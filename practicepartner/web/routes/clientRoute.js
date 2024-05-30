// app.js
const express = require("express");
const router = express.Router();
const {
  renderClientListPage,
  renderClientManagementPage,
  renderEditClientPage,
} = require("../controllers/clientController");

// Routes for handling client operations
router.get("/clients", renderClientListPage);


module.exports = router;
