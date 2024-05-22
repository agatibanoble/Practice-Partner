// app.js
const express = require("express");
const router = express.Router();
const {
  renderCaseListPage,
  renderCaseManagementPage,
} = require("../controllers/caseController");

// Routes for handling case operations
router.get("/listCases", renderCaseListPage);
router.get("/manageCase/:id", renderCaseManagementPage);

module.exports = router;
