const mongoose = require("mongoose");
const validator = require("validator");
// const { Schema } = mongoose;

const employeeSchema = new mongoose.Schema(
  {
    employeeNumber: {
      type: String,
      required: [true, "Employee Number is required"],
      trim: true,
      minlength: [2, "Employee Number must be at least 2 characters"],
      maxlength: [50, "Employee Number cannot exceed 50 characters"],
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
    image: {
      type: String,
      default: "default_image.jpg",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employeeCategory", // Assuming you have a separate employee category model
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "contactAddress", // Assuming you have a separate contact address model
    },
  },
  { timestamps: true }
);
// const Address = mongoose.model("Address", addressSchema);
const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
