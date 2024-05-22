const mongoose = require("mongoose");
const validator = require("validator");
const caseSchema = new mongoose.Schema(
  {
    folioNumber: {
      type: String,
      required: [true, "Folio Number is required"],
      trim: true,
      minlength: [2, "Folio Number must be at least 2 characters"],
      maxlength: [50, "Folio Number cannot exceed 50 characters"],
      default: null, // Set default value to null
    },
    caseNumber: {
      type: String,
      required: [true, "Case Number is required"],
      trim: true,
      minlength: [2, "Case Number must be at least 2 characters"],
      maxlength: [50, "Case Number cannot exceed 50 characters"],
      default: null, // Set default value to null
    },
    caseTitle: {
      type: String,
      required: [true, "Case Title is required"],
      trim: true,
      minlength: [2, "Client Name must be at least 2 characters"],
      maxlength: [50, "Client Name cannot exceed 50 characters"],
      default: null, // Set default value to null
    },
    caseFacts: {
      type: String,
      required: [true, "Case Title is required"],
      trim: true,
      minlength: [2, "Client Name must be at least 2 characters"],
      default: null, // Set default value to null
      //   maxlength: [50, "Client Name cannot exceed 50 characters"],
    },
    caseStartDate: {
      type: Date,
      required: true,
    },
    caseEndDate: {
      type: Date,
      // required: true,
      default: null, // Set default value to null
    },
    caseCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CaseCategory", // Assuming you have a separate Country model
      required: false,
      default: null, // Set default value to null
    },
    court: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Court",
      required: false,
      default: null, // Set default value to null
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: false,
    },
  },
  { timestamps: true }
);
const Case = mongoose.model("Case", caseSchema);

module.exports = Case;
