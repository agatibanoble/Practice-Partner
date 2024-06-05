const EmployeePosition = require("../models/EmployeePositionModel");

// Get all Employee Positions
const getAllEmployeePositions = async (req, res) => {
  try {
    const employeePositions = await EmployeePosition.find();
    res.status(200).json({
      success: true,
      message: "Employee Positions retrieved successfully",
      data: employeePositions,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "There was an error retrieving Employee Positions",
      data: null,
      error: error.message,
    });
  }
};

// Get an Employee Position by ID
const getEmployeePositionById = async (req, res) => {
  try {
    const employeePosition = await EmployeePosition.findById(req.params.id);
    if (!employeePosition) {
      return res.status(404).json({
        success: false,
        message: "Employee Position not found",
        data: null,
        error: "Employee Position not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Employee Position retrieved successfully",
      data: employeePosition,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "There was an error retrieving Employee Position",
      data: null,
      error: error.message,
    });
  }
};

// Create a new Employee Position
const createEmployeePosition = async (req, res) => {
  try {
    const employeePosition = new EmployeePosition(req.body);
    const savedEmployeePosition = await employeePosition.save();
    res.status(201).json({
      success: true,
      message: "Employee Position created successfully",
      data: savedEmployeePosition,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create Employee Position",
      data: null,
      error: error.message,
    });
  }
};

// Update an existing Employee Position by ID
const updateEmployeePositionById = async (req, res) => {
  try {
    const updatedEmployeePosition = await EmployeePosition.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEmployeePosition) {
      return res.status(404).json({
        success: false,
        message: "Employee Position not found",
        data: null,
        error: "Employee Position not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Employee Position updated successfully",
      data: updatedEmployeePosition,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update Employee Position",
      data: null,
      error: error.message,
    });
  }
};

// Delete an Employee Position by ID
const deleteEmployeePositionById = async (req, res) => {
  try {
    const deletedEmployeePosition = await EmployeePosition.findByIdAndDelete(
      req.params.id
    );
    if (!deletedEmployeePosition) {
      return res.status(404).json({
        success: false,
        message: "Employee Position not found",
        data: null,
        error: "Employee Position not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Employee Position deleted successfully",
      data: deletedEmployeePosition,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "There was an error deleting Employee Position",
      data: null,
      error: error.message,
    });
  }
};

module.exports = {
  getAllEmployeePositions,
  getEmployeePositionById,
  createEmployeePosition,
  updateEmployeePositionById,
  deleteEmployeePositionById,
};
