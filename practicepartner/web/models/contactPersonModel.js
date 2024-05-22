const mongoose = require("mongoose");
const validator = require("validator");

const ContactPerson = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    minlength: [2, "First name must be at least 2 characters"],
    maxlength: [50, "First name cannot exceed 50 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
    minlength: [2, "Last name must be at least 2 characters"],
    maxlength: [50, "Last name cannot exceed 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    unique: [true, "Email must be unique"],
    match: [/\S+@\S+\.\S+/, "Invalid email format"],
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  phone: {
    type: String,
    trim: true,
    match: [/^\d{10}$/, "Invalid phone number format"], // Assuming 10-digit phone number
  },
  address: {
    street: {
      type: String,
      trim: true,
      minlength: [2, "Street name must be at least 2 characters"],
      maxlength: [100, "Street name cannot exceed 100 characters"],
    },
    city: {
      type: String,
      trim: true,
      minlength: [2, "City name must be at least 2 characters"],
      maxlength: [50, "City name cannot exceed 50 characters"],
    },
    state: {
      type: String,
      trim: true,
      minlength: [2, "State name must be at least 2 characters"],
      maxlength: [50, "State name cannot exceed 50 characters"],
    },
    zipCode: {
      type: String,
      trim: true,
      match: [/^\d{5}$/, "Invalid ZIP code format"], // Assuming 5-digit zip code
    },
  },
  timestamps: {},
});

const Client = mongoose.model("Client", ContactPerson);

module.exports = Client;
