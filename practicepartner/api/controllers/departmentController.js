const Department = require("../models/departmentModel");

// Get all case categories
const getAllDepartments = function (req, res) {
  Department.find()
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
const getDepartmentById = function (req, res) {
  Department.findById(req.params.id)
    .then((department) => {
      if (!department) {
        const errorResponse = {
          success: false,
          message: "Department not found",
          data: null,
          error: "Department not found",
        };
        return res.status(404).json(errorResponse);
      }
      const successResponse = {
        success: true,
        message: "Department retrieved successfully",
        data: department,
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
const createDepartment = function (req, res) {
  const department = new Department(req.body);

  department
    .save()
    .then((department) => {
      const successResponse = {
        success: true,
        message: "Department created successfully",
        data: department,
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
const updateDepartmentById = function (req, res) {
  Department.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((department) => {
      if (!department) {
        const errorResponse = {
          success: false,
          message: "Department not found",
          data: null,
          error: "Department not found",
        };
        return res.status(404).json(errorResponse);
      }
      const successResponse = {
        success: true,
        message: "Department updated successfully",
        data: department,
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
const deleteDepartmentById = function (req, res) {
  Department.findByIdAndDelete(req.params.id)
    .then((department) => {
      if (!department) {
        const errorResponse = {
          success: false,
          message: "Department not found",
          data: null,
          error: "Department not found",
        };
        return res.status(404).json(errorResponse);
      }
      const successResponse = {
        success: true,
        message: "Department deleted successfully",
        data: department,
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
  createDepartment,
  updateDepartmentById,
  getAllDepartments,
  getDepartmentById,
  deleteDepartmentById,
};
