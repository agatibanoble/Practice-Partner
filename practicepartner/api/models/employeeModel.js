const mongoose = require("mongoose");
const validator = require("validator");
// Define the schema for an Employee
const employeeSchema = new mongoose.Schema(
  {
    employeeNumber: {
      type: String,
      required: true,
      unique: true,
    },
    employeeFirstName: {
      type: String,
      required: [true, "Employee First Name is required"],
      trim: true,
      minlength: [2, "Employee First Name must be at least 2 characters"],
      maxlength: [50, "Employee First Name cannot exceed 50 characters"],
    },
    employeeMiddleName: {
      type: String,
      trim: true,
    },
    employeeLastName: {
      type: String,
      required: [true, "Employee Last Name is required"],
      trim: true,
      minlength: [2, "Employee Last Name must be at least 2 characters"],
      maxlength: [50, "Employee Last Name cannot exceed 50 characters"],
    },
    employeeEmail: {
      type: String,
      required: false,
      unique: true,
    },
    employeePhone: {
      type: String,
      required: false,
    },
    employeeDepartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: false,
    },
    employeeCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmployeeCategory",
      required: false,
    },
    employeePosition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmployeePosition",
      required: false,
    },
    employeeStatus: {
      type: String,
      required: false,
      enum: ["Full-time", "Part-time", "Contract", "Intern"],
    },
    employeeGender: {
      type: String,
      required: false,
      enum: ["Male", "Female", "Other"],
    },
    employeeDateOfBirth: {
      type: Date,
      required: false,
    },
    employeeHireDate: {
      type: Date,
      required: false,
    },
    employeeAddress: {
      type: String,
      required: false,
    },
    employeeDescription: {
      type: String,
      default: "",
    },
    employeePhoto: {
      type: String, // Assuming the photo will be stored as a file path or URL
      required: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Create the model from the schema
const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
