const mongoose = require("mongoose");

const deliveryTypeSchema = new mongoose.Schema(
  {
    deliveryTypeName: {
      type: String,
      required: true,
      // unique: true, // Ensures that each category name is unique
    },
    deliveryTypeDescription: {
      type: String,
      // default: "", // Default value if description is not provided
    },
  },
  { timestamps: true }
);

const DeliveryType = mongoose.model("DeliveryType", deliveryTypeSchema);

module.exports = DeliveryType;
