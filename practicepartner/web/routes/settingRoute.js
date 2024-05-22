// Import necessary modules
const express = require("express");
const router = express.Router();
const settingController = require("../controllers/settingController");

router.get("/settings", settingController.renderIndex);

module.exports = router;
