const mongoose = require("mongoose");

const caseCategorySchema = new mongoose.Schema(
  {
    caseCategoryName: {
      type: String,
      required: true,
      // unique: true, // Ensures that each category name is unique
    },
    caseCategoryDescription: {
      type: String,
      // default: "", // Default value if description is not provided
    },
  },
  { timestamps: true }
);

const CaseCategory = mongoose.model("CaseCategory", caseCategorySchema);

module.exports = CaseCategory;
