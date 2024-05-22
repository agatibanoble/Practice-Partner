// countryRoutes.js

// Import necessary modules and controllers
const express = require("express");
const router = express.Router();
const countryController = require("../controllers/countryController");

// Define country routes

router.get("/countries", countryController.getCountries);
router.get("/countries/:id", countryController.getCountryById);
router.post("/countries", countryController.saveCountry);
router.delete("/countries/:id", countryController.deleteCountry);
router.get("/listCountries", countryController.renderCountryList);
// Export router
module.exports = router;
