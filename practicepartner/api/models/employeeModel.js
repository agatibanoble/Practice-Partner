const mongoose = require('mongoose');
const validator = require("validator");
// Define the schema for an Employee
const employeeSchema = new mongoose.Schema({
  employeeNumber: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: [true, "Employee Name is required"],
    trim: true,
    minlength: [2, "Employee Name must be at least 2 characters"],
    maxlength: [50, "Employee Name cannot exceed 50 characters"],
  },
  middleName: {
    type: String,
    trim: true,
    minlength: [2, "Employee Name must be at least 2 characters"],
    maxlength: [50, "Employee Name cannot exceed 50 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Employee Name is required"],
    trim: true,
    minlength: [2, "Employee Name must be at least 2 characters"],
    maxlength: [50, "Employee Name cannot exceed 50 characters"],
  },
  employeeEmail: {
    type: String,
    required: true,
    unique: true
  },
  employeePhone: {
    type: String,
    required: true
  },
  employeeDepartment: {
    type: String,
    required: true
  },
  employeePosition: {
    type: String,
    required: true
  },
  employeeStatus: {
    type: String,
    required: true,
    enum: ['Full-time', 'Part-time', 'Contract', 'Intern']
  },
  employeeGender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other']
  },
  employeeDOB: {
    type: Date,
    required: true
  },
  employeeHireDate: {
    type: Date,
    required: true
  },
  employeeAddress: {
    type: String,
    required: true
  },
  employeeDescription: {
    type: String,
    default: ''
  },
  employeePhoto: {
    type: String, // Assuming the photo will be stored as a file path or URL
    required: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

// Create the model from the schema
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;