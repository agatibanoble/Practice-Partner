const mongoose = require("mongoose");

const employeeCategorySchema = new mongoose.Schema(
  {
    employeeCategoryName: {
      type: String,
      required: true,
      // unique: true, // Ensures that each category name is unique
    },
    employeeCategoryDescription: {
      type: String,
      // default: "", // Default value if description is not provided
    },
  },
  { timestamps: true }
);

const EmployeeCategory = mongoose.model(
  "EmployeeCategory",
  employeeCategorySchema
);

module.exports = EmployeeCategory;
