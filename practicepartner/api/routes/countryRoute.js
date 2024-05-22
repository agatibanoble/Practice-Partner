// countryRoutes.js
const express = require("express");
const router = express.Router();
const {
  createCountry,
  getAllCountries,
  getCountryById,
  updateCountryById,
  deleteCountryById,
} = require("../controllers/countryController");

// Routes for handling country operations
router.get("/getCountries", getAllCountries);
router.get("/getCountry/:id", getCountryById);
router.post("/createCountry", createCountry);
router.post("/updateCountry/:id", updateCountryById);
router.delete("/deleteCountry/:id", deleteCountryById);

module.exports = router;
