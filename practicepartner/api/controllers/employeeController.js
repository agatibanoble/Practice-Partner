// Import the Employee model or any necessary modules
const Employee = require("../models/employeeModel");

// Create a new employee
const createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    const savedEmployee = await employee.save();
    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: savedEmployee,
      error: null,
    });
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create employee",
      data: null,
      error: error.message,
    });
  }
};

// Get all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({
      success: true,
      message: "Employees retrieved successfully",
      data: employees,
      error: null,
    });
  } catch (error) {
    console.error("Error getting employees:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve employees",
      data: null,
      error: error.message,
    });
  }
};

// Get an employee by ID
const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
        data: null,
        error: "Employee not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Employee retrieved successfully",
      data: employee,
      error: null,
    });
  } catch (error) {
    console.error("Error getting employee by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve employee",
      data: null,
      error: error.message,
    });
  }
};

// Update an employee by ID
const updateEmployeeById = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
        data: null,
        error: "Employee not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: updatedEmployee,
      error: null,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update employee",
      data: null,
      error: error.message,
    });
  }
};

// Delete an employee by ID
const deleteEmployeeById = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
        data: null,
        error: "Employee not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
      data: deletedEmployee,
      error: null,
    });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete employee",
      data: null,
      error: error.message,
    });
  }
};

// Export all functions
module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
};
