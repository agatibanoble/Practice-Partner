// app.js
const express = require("express");
const router = express.Router();
const {
  renderEmployeeListPage,
} = require("../controllers/employeeController");

// Routes for handling client operations
router.get("/employees", renderEmployeeListPage);


module.exports = router;
