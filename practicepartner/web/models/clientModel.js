const mongoose = require("mongoose");
const validator = require("validator");
// const { Schema } = mongoose;

const ClientSchema = new mongoose.Schema(
  {
    client_number: {
      type: String,
      required: [true, "Client Number is required"],
      trim: true,
      minlength: [2, "Client Number must be at least 2 characters"],
      maxlength: [50, "Client Number cannot exceed 50 characters"],
    },
    client_name: {
      type: String,
      required: [true, "Client Name is required"],
      trim: true,
      minlength: [2, "Client Name must be at least 2 characters"],
      maxlength: [50, "Client Name cannot exceed 50 characters"],
    },
    email_address: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      // unique: [true, "Email must be unique"],
      match: [/\S+@\S+\.\S+/, "Invalid email format"],
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    mobile_phone_number: {
      type: String,
      trim: true,
      // match: [/^\d{10}$/, "Invalid phone number format"], // Assuming 10-digit phone number
    },
    office_phone_number: {
      type: String,
      trim: true,
      //match: [/^\d{10}$/, "Invalid phone number format"], // Assuming 10-digit phone number
    },
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "clientCategory", // Assuming you have a separate Country model
      },
    ],
    address: {
      state: { type: String, required: false },
      zip: { type: String, required: false },
      region_id: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "region", // Assuming you have a separate Country model
        },
      ],
      postal_address: {
        type: String,
        trim: true,
        minlength: [2, "Postal Address must be at least 2 characters"],
        maxlength: [100, "Postal Address cannot exceed 100 characters"],
      },
      permanent_address: {
        type: String,
        trim: true,
        minlength: [2, "Permanent Address must be at least 2 characters"],
        maxlength: [100, "Permanent Address cannot exceed 100 characters"],
      },
      city: {
        type: String,
        trim: true,
        minlength: [2, "City name must be at least 2 characters"],
        maxlength: [50, "City name cannot exceed 50 characters"],
      },
      land_mark: {
        type: String,
        trim: true,
        minlength: [2, "Land Mark must be at least 2 characters"],
        maxlength: [50, "Land Mark cannot exceed 50 characters"],
      },
    },
  },
  { timestamps: true }
);
// const Address = mongoose.model("Address", addressSchema);
const Client = mongoose.model("Client", ClientSchema);

module.exports = Client;
