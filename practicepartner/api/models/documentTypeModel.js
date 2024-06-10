const mongoose = require("mongoose");

const documentTypeSchema = new mongoose.Schema(
  {
    documentTypeName: {
      type: String,
      required: true,
      // unique: true, // Ensures that each category name is unique
    },
    documentTypeDescription: {
      type: String,
      // default: "", // Default value if description is not provided
    },
  },
  { timestamps: true }
);

const DocumentType = mongoose.model("DocumentType", documentTypeSchema);

module.exports = DocumentType;
