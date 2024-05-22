const mongoose = require("mongoose");
const EmployeeModel = require("./employeeModel"); // Import the base Employee schema
const { Schema } = mongoose;

const lawyerSchema = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    }, // Reference to the Employee schema
    specialization: {
      type: String,
      required: false,
    },
    rollNumber: {
      type: String,
      required: false,
    },
    callDate: {
      type: Date,
      default: Date.now,
      required: false,
    }, // Adding the callDate field with a default value
  },
  { timestamps: true }
);

const Lawyer = EmployeeModel.discriminator("Lawyer", lawyerSchema); // Discriminator for schema inheritance

module.exports = Lawyer;
