const mongoose = require("mongoose");

// Define Region Schema
const regionSchema = new mongoose.Schema({
  regionName: {
    type: String,
    required: true, // Assuming region names are unique within a country
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country", // Assuming you have a separate Country model
    required: false,
  },
  // You can add more properties as needed, like population, area, etc.
});

// Create Region model
const Region = mongoose.model("Region", regionSchema);

module.exports = Region;
