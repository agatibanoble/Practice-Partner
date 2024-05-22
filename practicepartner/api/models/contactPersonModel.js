const mongoose = require("mongoose");
const validator = require("validator");

const contactPerson = new mongoose.Schema(
  {
    // Add a reference to the Client model
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client", // Reference to the Client model
      required: true,
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
    mobilePhone: {
      type: String,
      //trim: true,
    },
    officePhone: {
      type: String,
      //trim: true,
    },
    alternatePhone: {
      type: String,
      //trim: true,
    },
    email: {
      type: String,
      // //trim: true,
      lowercase: true,
      required: false,
      // unique: [true, "Email must be unique"],
      match: [/\S+@\S+\.\S+/, "Invalid email format"],
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    alternateEmail: {
      type: String,
      // //trim: true,
      lowercase: true,
      required: false,
      // unique: [true, "Email must be unique"],
      match: [/\S+@\S+\.\S+/, "Invalid email format"],
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    street: {
      type: String,
      // minlength: [2, "Street must be at least 2 characters"],
      // maxlength: [50, "Street cannot exceed 50 characters"],
    },
    city: {
      type: String,
      //trim: true,
      //minlength: [2, "Postal Address must be at least 2 characters"],
      //maxlength: [100, "Postal Address cannot exceed 100 characters"],
    },
    buildingNumber: {
      type: String,
      //trim: true,
      //minlength: [2, "Postal Address must be at least 2 characters"],
      //maxlength: [100, "Postal Address cannot exceed 100 characters"],
    },
    gpsAddress: {
      type: String,
      //trim: true,
      // minlength: [2, "Postal Address must be at least 2 characters"],
      // maxlength: [100, "Postal Address cannot exceed 100 characters"],
    },
    postalAddress: {
      type: String,
      //trim: true,
      //minlength: [2, "Postal Address must be at least 2 characters"],
      //maxlength: [100, "Postal Address cannot exceed 100 characters"],
    },
    residentialAddress: {
      type: String,
      //trim: true,
      //minlength: [2, "Postal Address must be at least 2 characters"],
      //maxlength: [100, "Postal Address cannot exceed 100 characters"],
    },
    landMark: {
      type: String,
      //trim: true,
      // minlength: [2, "Land Mark must be at least 2 characters"],
      // maxlength: [50, "Land Mark cannot exceed 50 characters"],
    },
    regionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "region", // Assuming you have a separate Country model
      required: true,
    },
    image: {
      type: String,
      default: "default_image.jpg",
    },
    timestamps: {},
  },
  { collection: "contactPersons" }
); // Specify the collection name explicitly);

const ContactPerson = mongoose.model("ContactPerson", contactPerson);

module.exports = ContactPerson;
