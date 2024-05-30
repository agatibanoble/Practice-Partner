const mongoose = require("mongoose");
const validator = require("validator");
// const { Schema } = mongoose;

const ClientSchema = new mongoose.Schema(
  {
    clientNumber: {
      type: String,
      // required: [true, "Client Number is required"],
      trim: true,
      minlength: [2, "Client Number must be at least 2 characters"],
      maxlength: [50, "Client Number cannot exceed 50 characters"],
    },
    clientName: {
      type: String,
      //required: [true, "Client Name is required"],
      trim: true,
      minlength: [2, "Client Name must be at least 2 characters"],
      // maxlength: [50, "Client Name cannot exceed 50 characters"],
    },
    clientDescription: {
      type: String,
      //required: [true, "Client Name is required"],
      trim: true,
      minlength: [2, "Client Description must be at least 2 characters"],
      maxlength: [500, "Client Description cannot exceed 500 characters"],
    },
    clientImage: {
      type: String,
      default: "default_image.jpg",
    },
    clientType: {
      type: String,
      trim: true,
    },
    clientReferralType: {
      type: String,
      trim: true,
    },
    clientCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClientCategory", // Assuming you have a separate  model
    },
    conferences: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conference", // Assuming you have a separate Country model
      },
    ],
    contactPersons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ContactPerson", // Assuming you have a separate Country model
      },
    ],
    contactAddresses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ContactAddress", // Assuming you have a separate Country model
      },
    ],
    cases: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Case", // Assuming you have a separate Country model
      },
    ],
  },
  { timestamps: true }
);

// Function to search for clients by name using a regular expression
ClientSchema.statics.search = async function (searchTerm) {
  try {
    // Check if searchTerm is empty or falsy
    if (!searchTerm) {
      return []; // Return an empty array if searchTerm is empty
    }

    // Construct a regex pattern to match the search term case-insensitively
    const regex = new RegExp(searchTerm, "i");

    // Construct the query object to search across all fields
    const query = {
      $or: [
        { clientName: { $regex: regex } },
        { clientNumber: { $regex: regex } },
        { email: { $regex: regex } },
        // Add other fields as needed
      ],
    };

    // Perform the search using the constructed query
    const results = await this.find(query);
    return results;
  } catch (error) {
    throw error;
  }
};
// const Address = mongoose.model("Address", addressSchema);
const Client = mongoose.model("Client", ClientSchema);

module.exports = Client;
