// app.js
const express = require("express");
const router = express.Router();
const { renderDispatchListPage } = require("../controllers/dispatchController");

// Routes for handling client operations
router.get("/", renderDispatchListPage);

module.exports = router;
