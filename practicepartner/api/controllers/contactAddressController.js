const ContactAddress = require("../models/contactAddressModel");
const Client = require("../models/clientModel");
const mongoose = require("mongoose");
// const createContactAddress = (req, res) => {
const createContactAddress = (req, res) => {
  console.log("New address request body:", req.body);

  // Remove _id field from req.body if present
  delete req.body._id;

  // Create a new instance of ContactAddress
  const contactAddress = new ContactAddress(req.body);

  // Save the client address to get the generated _id
  contactAddress
    .save()
    .then(async (newContactAddress) => {
      // Fetch the current client document to get the existing contactAddressIds array
      const client = await Client.findById(req.body.clientId);
      const existingContactAddressIds = client.contactAddresses || [];
      // Add the new contactAddressId to the existing array if not already present
      if (!existingContactAddressIds.includes(newContactAddress._id)) {
        existingContactAddressIds.push(newContactAddress._id);
      }
      // Update the client document with the updated contactAddressIds array
      client.contactAddresses = existingContactAddressIds;
      return await client.save();
    })
    .then((updatedClient) => {
      console.log(
        "Client document updated with contactAddressId:",
        updatedClient
      );

      res.status(201).json({
        success: true,
        message: "Client Address created and linked successfully",
        data: updatedClient,
      });
    })
    .catch((error) => {
      console.error("Error creating client address or updating client:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create address or link client",
        error: error.message,
      });
    });
};

const getAllContactAddresses = async (req, res) => {
  try {
    const client = await Client.findById(req.params.clientId)
      .populate({
        path: "contactAddresses",
        model: "ContactAddress",
        options: { strictPopulate: true },
      })
      .exec();

    // Check if the client exists
    if (!client) {
      const errorResponse = {
        success: false,
        message: "Client not found",
        data: null,
        error: "Client not found",
      };
      return res.status(404).json(errorResponse);
    }

    const successResponse = {
      success: true,
      message: "Contact Addresses retrieved successfully",
      data: client, // Assuming ContactAddress holds the addresses
      error: null,
    };
    res.status(200).json(successResponse);
  } catch (error) {
    const errorResponse = {
      success: false,
      message: "Failed to fetch contact addresses",
      data: null,
      error: error.message,
    };
    res.status(500).json(errorResponse);
  }
};
const getContactAddressById = async (req, res) => {
  try {
    const contactAddressId = req.params.id;

    const client = await Client.findOne({ contactAddresses: contactAddressId })
      .populate({
        path: "contactAddresses",
        match: { _id: contactAddressId }, // Filter the contactAddresses to match the given ID
      })
      .exec();

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client Address not found!",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact Address retrieved successfully",
      data: client,
      error: null,
    });
  } catch (error) {
    console.error("Error fetching contact address with client:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch contact address",
      data: null,
      error: error.message,
    });
  }
};

// const getContactAddressById = async (req, res) => {
//   try {
//     const contactAddressId = req.params.id;

//     const contactAddress = await Client.findOne(
//       { contactAddresses: contactAddressId },
//       { "contactAddresses.$": 1 }
//     );
//     // return contactAddress;
//     if (!contactAddress) {
//       return res.status(404).json({
//         success: false,
//         message: "Client Address not found!",
//         data: null,
//       });
//     }
//     res.status(200).json({
//       success: true,
//       message: "ContactAddress retrieved successfully",
//       data: contactAddress,
//       error: null,
//     });
//   } catch (error) {
//     console.error("Error fetching contact address with client:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch conference",
//       data: null,
//       error: error.message,
//     });
//   }
// };

// Get a conference by ID
// const getContactAddressById = async (req, res) => {
//   try {
//     const contactAddressId = req.params.id;
//     const contactAddress = await ContactAddress.findById(contactAddressId)
//       .populate({
//         path: "clientId",
//         model: "Client",
//         options: { strictPopulate: true },
//       })
//       .exec();
//     if (!contactAddress) {
//       return res.status(404).json({
//         success: false,
//         message: "Client Address not found",
//         data: null,
//       });
//     }
//     res.status(200).json({
//       success: true,
//       message: "ContactAddress retrieved successfully",
//       data: contactAddress,
//       error: null,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch conference",
//       data: null,
//       error: error.message,
//     });
//   }
// };

// Update a conference by ID
const updateContactAddressById = async (req, res) => {
  try {
    const contactAddressId = req.params.id;
    const updatedContactAddress = await ContactAddress.findByIdAndUpdate(
      contactAddressId,
      req.body,
      { new: true }
    );
    if (!updatedContactAddress) {
      return res.status(404).json({
        success: false,
        message: "ContactAddress not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "ContactAddress updated successfully",
      data: updatedContactAddress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update conference",
      error: error.message,
    });
  }
};

const deleteContactAddressById = async (req, res) => {
  try {
    const contactAddressId = req.params.id;

    // Validate contactAddressId as a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(contactAddressId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact address ID",
      });
    }

    // Delete the contact address from the ContactAddress collection
    const deletedContactAddress = await ContactAddress.findByIdAndDelete(
      contactAddressId
    );
    if (!deletedContactAddress) {
      return res.status(404).json({
        success: false,
        message: "Contact Address not found",
      });
    }

    // Remove the contact address ID from the contactAddresses field in the Client document
    const updateResult = await Client.updateOne(
      { contactAddresses: contactAddressId },
      { $pull: { contactAddresses: contactAddressId } }
    );

    res.status(200).json({
      success: true,
      message: "ContactAddress deleted successfully",
      data: deletedContactAddress,
      updatedClient: updateResult,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete client address",
      error: error.message,
    });
  }
};

module.exports = {
  createContactAddress,
  getAllContactAddresses,
  getContactAddressById,
  updateContactAddressById,
  deleteContactAddressById,
};
