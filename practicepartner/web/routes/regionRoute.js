// app.js
const express = require("express");
const router = express.Router();
const { renderRegions } = require("../controllers/regionController");

// Routes for handling client operations
router.get("/", renderRegions);

module.exports = router;
