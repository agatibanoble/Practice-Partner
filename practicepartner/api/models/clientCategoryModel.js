const mongoose = require("mongoose");

const clientCategorySchema = new mongoose.Schema(
  {
    clientCategoryName: {
      type: String,
      required: true,
      // unique: true, // Ensures that each category name is unique
    },
    clientCategoryDescription: {
      type: String,
      // default: "", // Default value if description is not provided
    },
  },
  { timestamps: true }
);

const ClientCategory = mongoose.model("ClientCategory", clientCategorySchema);

module.exports = ClientCategory;
