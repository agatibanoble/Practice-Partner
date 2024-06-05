// countryRoutes.js

// Import necessary modules and controllers
const express = require("express");
const router = express.Router();
const renderCountries = require("../controllers/countryController");

router.get("/listCountries", countryController.renderCountries);
// Export router
module.exports = router;
