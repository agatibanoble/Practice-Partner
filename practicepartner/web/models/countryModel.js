const mongoose = require("mongoose");

// Define Countryt Schema
const countrySchema = new mongoose.Schema({
  country_name: {
    type: String,
    required: true, // Assuming country names are unique within a country
  },
  // You can add more properties as needed, like population, area, etc.
});

// Create Countryt model
const Country = mongoose.model("Country", countrySchema);

module.exports = Country;
