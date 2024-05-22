const CaseCategory = require("../models/caseCategoryModel");

// Get all case categories
const getAllCaseCategories = function (req, res) {
  CaseCategory.find()
    .then((caseCategories) => {
      const successResponse = {
        success: true,
        message: "Case categories retrieved successfully",
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
const getCaseCategoryById = function (req, res) {
  CaseCategory.findById(req.params.id)
    .then((caseCategory) => {
      if (!caseCategory) {
        const errorResponse = {
          success: false,
          message: "Case category not found",
          data: null,
          error: "Case category not found",
        };
        return res.status(404).json(errorResponse);
      }
      const successResponse = {
        success: true,
        message: "Case category retrieved successfully",
        data: caseCategory,
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
const createCaseCategory = function (req, res) {
  const caseCategory = new CaseCategory(req.body);

  caseCategory
    .save()
    .then((caseCategory) => {
      const successResponse = {
        success: true,
        message: "Case category created successfully",
        data: caseCategory,
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
const updateCaseCategoryById = function (req, res) {
  CaseCategory.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((caseCategory) => {
      if (!caseCategory) {
        const errorResponse = {
          success: false,
          message: "Case category not found",
          data: null,
          error: "Case category not found",
        };
        return res.status(404).json(errorResponse);
      }
      const successResponse = {
        success: true,
        message: "Case category updated successfully",
        data: caseCategory,
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
const deleteCaseCategoryById = function (req, res) {
  CaseCategory.findByIdAndDelete(req.params.id)
    .then((caseCategory) => {
      if (!caseCategory) {
        const errorResponse = {
          success: false,
          message: "Case category not found",
          data: null,
          error: "Case category not found",
        };
        return res.status(404).json(errorResponse);
      }
      const successResponse = {
        success: true,
        message: "Case category deleted successfully",
        data: caseCategory,
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
  createCaseCategory,
  updateCaseCategoryById,
  getAllCaseCategories,
  getCaseCategoryById,
  deleteCaseCategoryById,
};
