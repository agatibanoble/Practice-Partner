const ClientCategory = require("../models/clientCategoryModel");

// Get all client categories
const getAllClientCategories = function (req, res) {
  // Retrieve all client categories from the database
  ClientCategory.find()
    .then((clientCategories) => {
      // Send a success response with the list of client categories
      const successResponse = {
        success: true,
        message: "Client categories retrieved successfully",
        data: clientCategories,
        error: null,
      };
      res.status(200).json(successResponse);
    })
    .catch((error) => {
      // Send an error response if an error occurs while fetching client categories
      const errorResponse = {
        success: false,
        message: "There was an error retrieving client categories",
        data: null,
        error: error.message,
      };
      res.status(500).json(errorResponse);
    });
};

// Get a client category by ID
const getClientCategoryById = function (req, res) {
  // Find a client category by ID
  ClientCategory.findById(req.params.id)
    .then((clientCategory) => {
      // Check if the client category exists
      if (!clientCategory) {
        const errorResponse = {
          success: false,
          message: "Client category not found",
          data: null,
          error: "Client category not found",
        };
        return res.status(404).json(errorResponse);
      }
      // Send a success response with the client category details
      const successResponse = {
        success: true,
        message: "Client category retrieved successfully",
        data: clientCategory,
        error: null,
      };
      res.status(200).json(successResponse);
    })
    .catch((error) => {
      // Send an error response if an error occurs while fetching the client category
      const errorResponse = {
        success: false,
        message: "There was an error retrieving client category",
        data: null,
        error: error.message,
      };
      res.status(500).json(errorResponse);
    });
};

// Create a new client category
const createClientCategory = function (req, res) {
  // Create a new client category instance using the request body
  const clientCategory = new ClientCategory(req.body);

  // Save the client category to the database
  clientCategory
    .save()
    .then((clientCategory) => {
      // If the client category is successfully saved, send a success response
      const successResponse = {
        success: true,
        message: "Client category created successfully",
        data: clientCategory,
        error: null,
      };
      res.json(successResponse);
    })
    .catch((error) => {
      // If an error occurs during client category creation or saving, handle it here
      console.error("Error creating client category:", error);

      // Send an error response
      const errorResponse = {
        success: false,
        message: "Failed to create client category",
        data: null,
        error: error.message,
      };
      res.status(500).json(errorResponse);
    });
};

// Update an existing client category
const updateClientCategoryById = function (req, res) {
  // Find and update the client category by ID
  ClientCategory.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((clientCategory) => {
      // Check if the client category exists
      if (!clientCategory) {
        const errorResponse = {
          success: false,
          message: "Client category not found",
          data: null,
          error: "Client category not found",
        };
        return res.status(404).json(errorResponse);
      }
      // Send a success response if the client category is updated successfully
      const successResponse = {
        success: true,
        message: "Client category updated successfully",
        data: clientCategory,
        error: null,
      };
      res.json(successResponse);
    })
    .catch((error) => {
      console.error("Error updating client category:", error);
      // Send an error response if an error occurs during client category update
      const errorResponse = {
        success: false,
        message: "Failed to update client category",
        data: null,
        error: "Failed to update client category",
      };
      res.status(500).json(errorResponse);
    });
};

// Delete a client category by ID
const deleteClientCategoryById = function (req, res) {
  // Find and delete the client category by ID
  ClientCategory.findByIdAndDelete(req.params.id)
    .then((clientCategory) => {
      // Check if the client category exists
      if (!clientCategory) {
        const errorResponse = {
          success: false,
          message: "Client category not found",
          data: null,
          error: "Client category not found",
        };
        return res.status(404).json(errorResponse);
      }
      // Send a success response if the client category is deleted successfully
      const successResponse = {
        success: true,
        message: "Client category deleted successfully",
        data: clientCategory,
        error: null,
      };
      res.status(200).json(successResponse);
    })
    .catch((error) => {
      // Send an error response if an error occurs while deleting the client category
      const errorResponse = {
        success: false,
        message: "There was an error deleting client category",
        data: null,
        error: error.message,
      };
      res.status(500).json(errorResponse);
    });
};

// Export all functions
module.exports = {
  createClientCategory,
  updateClientCategoryById,
  getAllClientCategories,
  getClientCategoryById,
  deleteClientCategoryById,
};
