const Country = require("../models/countryModel");

// Get all countries
const getAllCountries = function (req, res) {
  // Retrieve all countries from the database
  Country.find()
    .then((countries) => {
      // Send a success response with the list of countries
      const successResponse = {
        success: true,
        message: "Countries retrieved successfully",
        data: countries,
        error: null,
      };
      res.status(200).json(successResponse);
    })
    .catch((error) => {
      // Send an error response if an error occurs while fetching countries
      const errorResponse = {
        success: false,
        message: "There was an error retrieving countries",
        data: null,
        error: error.message,
      };
      res.status(500).json(errorResponse);
    });
};

// Get a country by ID
const getCountryById = function (req, res) {
  // Find a country by ID
  Country.findById(req.params.id)
    .then((country) => {
      // Check if the country exists
      if (!country) {
        const errorResponse = {
          success: false,
          message: "Country not found",
          data: null,
          error: "Country not found",
        };
        return res.status(404).json(errorResponse);
      }
      // Send a success response with the country details
      const successResponse = {
        success: true,
        message: "Country retrieved successfully",
        data: country,
        error: null,
      };
      res.status(200).json(successResponse);
    })
    .catch((error) => {
      // Send an error response if an error occurs while fetching the country
      const errorResponse = {
        success: false,
        message: "There was an error retrieving country",
        data: null,
        error: error.message,
      };
      res.status(500).json(errorResponse);
    });
};

// Create a new country
const createCountry = function (req, res) {
  // Create a new country instance using the request body
  const country = new Country(req.body);

  // Save the country to the database
  country
    .save()
    .then((country) => {
      // If the country is successfully saved, send a success response
      const successResponse = {
        success: true,
        message: "Country created successfully",
        data: country,
        error: null,
      };
      res.json(successResponse);
    })
    .catch((error) => {
      // If an error occurs during country creation or saving, handle it here
      console.error("Error creating country:", error);

      // Send an error response
      const errorResponse = {
        success: false,
        message: "Failed to create country",
        data: null,
        error: error.message,
      };
      res.status(500).json(errorResponse);
    });
};

// Update an existing country
const updateCountryById = function (req, res) {
  // Find and update the country by ID
  Country.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((country) => {
      // Check if the country exists
      if (!country) {
        const errorResponse = {
          success: false,
          message: "Country not found",
          data: null,
          error: "Country not found",
        };
        return res.status(404).json(errorResponse);
      }
      // Send a success response if the country is updated successfully
      const successResponse = {
        success: true,
        message: "Country updated successfully",
        data: country,
        error: null,
      };
      res.json(successResponse);
    })
    .catch((error) => {
      console.error("Error updating country:", error);
      // Send an error response if an error occurs during country update
      const errorResponse = {
        success: false,
        message: "Failed to update country",
        data: null,
        error: "Failed to update country",
      };
      res.status(500).json(errorResponse);
    });
};

// Delete a country by ID
const deleteCountryById = function (req, res) {
  // Find and delete the country by ID
  Country.findByIdAndDelete(req.params.id)
    .then((country) => {
      // Check if the country exists
      if (!country) {
        const errorResponse = {
          success: false,
          message: "Country not found",
          data: null,
          error: "Country not found",
        };
        return res.status(404).json(errorResponse);
      }
      // Send a success response if the country is deleted successfully
      const successResponse = {
        success: true,
        message: "Country deleted successfully",
        data: country,
        error: null,
      };
      res.status(200).json(successResponse);
    })
    .catch((error) => {
      // Send an error response if an error occurs while deleting the country
      const errorResponse = {
        success: false,
        message: "There was an error deleting country",
        data: null,
        error: error.message,
      };
      res.status(500).json(errorResponse);
    });
};

// Export all functions
module.exports = {
  createCountry,
  updateCountryById,
  getAllCountries,
  getCountryById,
  deleteCountryById,
};
