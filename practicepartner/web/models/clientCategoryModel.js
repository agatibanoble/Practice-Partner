const mongoose = require("mongoose");

const clientCategorySchema = new mongoose.Schema(
  {
    client_category_name: {
      type: String,
      required: true,
      // unique: true, // Ensures that each category name is unique
    },
    client_category_description: {
      type: String,
      // default: "", // Default value if description is not provided
    },
    isActive: {
      type: Boolean,
      default: true, // Default value for isActive field
    },
  },
  { timestamps: true }
);

const clientCategoryModel = mongoose.model(
  "clientCategory",
  clientCategorySchema
);

module.exports = clientCategoryModel;
