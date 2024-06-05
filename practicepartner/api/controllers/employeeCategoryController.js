const EmployeeCategory = require("../models/EmployeeCategoryModel");

// Get all Empoloyee Categories
const getAllEmployeeCategories = function (req, res) {
  EmployeeCategory.find()
    .then((EmployeeCategories) => {
      const successResponse = {
        success: true,
        message: "Empoloyee Categories retrieved successfully",
        data: EmployeeCategories,
        error: null,
      };
      res.status(200).json(successResponse);
    })
    .catch((error) => {
      const errorResponse = {
        success: false,
        message: "There was an error retrieving Empoloyee Categories",
        data: null,
        error: error.message,
      };
      res.status(500).json(errorResponse);
    });
};

// Get a case category by ID
const getEmployeeCategoryById = function (req, res) {
  EmployeeCategory.findById(req.params.id)
    .then((EmployeeCategory) => {
      if (!EmployeeCategory) {
        const errorResponse = {
          success: false,
          message: "Employee Category not found",
          data: null,
          error: "Employee Category not found",
        };
        return res.status(404).json(errorResponse);
      }
      const successResponse = {
        success: true,
        message: "Employee Category retrieved successfully",
        data: EmployeeCategory,
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
const createEmployeeCategory = async (req, res) => {
  try {
    const employeeCategory = new EmployeeCategory(req.body);
    const savedCategory = await employeeCategory.save();

    const successResponse = {
      success: true,
      message: "Employee Category created successfully",
      data: savedCategory,
      error: null,
    };
    res.status(201).json(successResponse);
  } catch (error) {
    console.error("Error creating employee category:", error);
    const errorResponse = {
      success: false,
      message: "Failed to create employee category",
      data: null,
      error: error.message,
    };
    res.status(500).json(errorResponse);
  }
};
// Update an existing case category
const updateEmployeeCategoryById = function (req, res) {
  EmployeeCategory.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((EmployeeCategory) => {
      if (!EmployeeCategory) {
        const errorResponse = {
          success: false,
          message: "Employee Category not found",
          data: null,
          error: "Employee Category not found",
        };
        return res.status(404).json(errorResponse);
      }
      const successResponse = {
        success: true,
        message: "Employee Category updated successfully",
        data: EmployeeCategory,
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
const deleteEmployeeCategoryById = function (req, res) {
  EmployeeCategory.findByIdAndDelete(req.params.id)
    .then((EmployeeCategory) => {
      if (!EmployeeCategory) {
        const errorResponse = {
          success: false,
          message: "Employee Category not found",
          data: null,
          error: "Employee Category not found",
        };
        return res.status(404).json(errorResponse);
      }
      const successResponse = {
        success: true,
        message: "Employee Category deleted successfully",
        data: EmployeeCategory,
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
  createEmployeeCategory,
  updateEmployeeCategoryById,
  getAllEmployeeCategories,
  getEmployeeCategoryById,
  deleteEmployeeCategoryById,
};
