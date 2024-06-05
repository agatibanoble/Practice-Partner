// app.js
const express = require("express");
const router = express.Router();
const {
  renderComplaintListPage,
} = require("../controllers/complaintController");

// Routes for handling client operations
router.get("/", renderComplaintListPage);

module.exports = router;
