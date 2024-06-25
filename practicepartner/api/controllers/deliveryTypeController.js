const DeliveryType = require("../models/deliveryTypeModel");

// Get all case categories
const getAllDeliveryTypes = function (req, res) {
  DeliveryType.find()
    .then((caseCategories) => {
      const successResponse = {
        success: true,
        message: "Delivery Types retrieved successfully",
        data: caseCategories,
        error: null,
      };
      res.status(200).json(successResponse);
    })
    .catch((error) => {
      const errorResponse = {
        success: false,
        message: "There was an error retrieving case categories",
        data: null,
        error: error.message,
      };
      res.status(500).json(errorResponse);
    });
};

// Get a case category by ID
const getDeliveryTypeById = function (req, res) {
  DeliveryType.findById(req.params.id)
    .then((DeliveryType) => {
      if (!DeliveryType) {
        const errorResponse = {
          success: false,
          message: "DeliveryType not found",
          data: null,
          error: "DeliveryType not found",
        };
        return res.status(404).json(errorResponse);
      }
      const successResponse = {
        success: true,
        message: "DeliveryType retrieved successfully",
        data: DeliveryType,
        error: null,
      };
      res.status(200).json(successResponse);
    })
    .catch((error) => {
      const errorResponse = {
        success: false,
        message: "There was an error retrieving case category",
        data: null,
        error: error.message,
      };
      res.status(500).json(errorResponse);
    });
};

// Create a new case category
const createDeliveryType = function (req, res) {
  const deliveryType = new DeliveryType(req.body);

  deliveryType
    .save()
    .then((DeliveryType) => {
      const successResponse = {
        success: true,
        message: "DeliveryType created successfully",
        data: DeliveryType,
        error: null,
      };
      res.json(successResponse);
    })
    .catch((error) => {
      console.error("Error creating case category:", error);
      const errorResponse = {
        success: false,
        message: "Failed to create case category",
        data: null,
        error: error.message,
      };
      res.status(500).json(errorResponse);
    });
};

// Update an existing case category
const updateDeliveryTypeById = function (req, res) {
  DeliveryType.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((DeliveryType) => {
      if (!DeliveryType) {
        const errorResponse = {
          success: false,
          message: "DeliveryType not found",
          data: null,
          error: "DeliveryType not found",
        };
        return res.status(404).json(errorResponse);
      }
      const successResponse = {
        success: true,
        message: "DeliveryType updated successfully",
        data: DeliveryType,
        error: null,
      };
      res.json(successResponse);
    })
    .catch((error) => {
      console.error("Error updating case category:", error);
      const errorResponse = {
        success: false,
        message: "Failed to update case category",
        data: null,
        error: error.message,
      };
      res.status(500).json(errorResponse);
    });
};

// Delete a case category by ID
const deleteDeliveryTypeById = function (req, res) {
  DeliveryType.findByIdAndDelete(req.params.id)
    .then((DeliveryType) => {
      if (!DeliveryType) {
        const errorResponse = {
          success: false,
          message: "DeliveryType not found",
          data: null,
          error: "DeliveryType not found",
        };
        return res.status(404).json(errorResponse);
      }
      const successResponse = {
        success: true,
        message: "DeliveryType deleted successfully",
        data: DeliveryType,
        error: null,
      };
      res.status(200).json(successResponse);
    })
    .catch((error) => {
      const errorResponse = {
        success: false,
        message: "There was an error deleting case category",
        data: null,
        error: error.message,
      };
      res.status(500).json(errorResponse);
    });
};

module.exports = {
  createDeliveryType,
  updateDeliveryTypeById,
  getAllDeliveryTypes,
  getDeliveryTypeById,
  deleteDeliveryTypeById,
};
