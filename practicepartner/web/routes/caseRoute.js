// app.js
const express = require("express");
const router = express.Router();
const {
  renderCaseListPage,
  renderCaseManagementPage,
} = require("../controllers/caseController");

// Routes for handling case operations
router.get("/cases", renderCaseListPage);

module.exports = router;
