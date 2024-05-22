const ContactPerson = require("../models/contactPersonModel");
const Client = require("../models/clientModel");

const createContactPerson = async (req, res) => {
  try {
    console.log("New contact person request body:", req.body);

    // Create a new instance of ContactPerson
    const contactPerson = await ContactPerson.create(req.body);

    // Extract clientId from the request body
    const clientId = req.body.client;

    // Add the new contact person's id to the client's contactPersons array
    const updatedClient = await Client.findByIdAndUpdate(
      clientId,
      { $addToSet: { contactPersons: contactPerson._id } },
      { new: true }
    );

    // console.log(updatedClient.contactPersons);
    res.status(201).json({
      success: true,
      message: "Contact Person created and linked successfully",
      data: { contactPerson, updatedClient },
    });
  } catch (error) {
    console.error("Error creating contact person:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create contact person",
      error: error.message,
    });
  }
};
const getAllContactPersons = async (req, res) => {
  try {
    const contactPersons = await ContactPerson.find({
      client: req.params.clientId,
    })
      .populate({
        path: "client",
        model: "Client",
        options: { strictPopulate: true }, // Set strictPopulate based on your schema
      })
      .exec();

    res.status(200).json({
      success: true,
      message: "Contact Persons retrieved successfully",
      data: contactPersons,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch contact persons",
      error: error.message,
    });
  }
};

const getContactPersonById = async (req, res) => {
  try {
    const contactPerson = await ContactPerson.findById(req.params.id)
      .populate({
        path: "client", // Assuming 'clientId' is the field referencing the Client model
        model: "Client",
        //select: "clientName contactAddresses", // Select the fields you want to populate
        // You can include more options if needed, such as 'options: { strictPopulate: false }'
      })
      .exec();

    if (!contactPerson) {
      return res.status(404).json({
        success: false,
        message: "Contact Person not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact Person retrieved successfully",
      data: contactPerson,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch Contact Person",
      error: error.message,
    });
  }
};

// const getContactPersonById = async (req, res) => {
//   try {
//     const contactPerson = await ContactPerson.findById(req.params.id);

//     if (!contactPerson) {
//       return res.status(404).json({
//         success: false,
//         message: "Contact Person not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Contact Person retrieved successfully",
//       data: contactPerson,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch Contact Person",
//       error: error.message,
//     });
//   }
// };

const updateContactPersonById = async (req, res) => {
  try {
    const updatedContactPerson = await ContactPerson.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedContactPerson) {
      return res.status(404).json({
        success: false,
        message: "Contact Person not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact Person updated successfully",
      data: updatedContactPerson,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update Contact Person",
      error: error.message,
    });
  }
};

const deleteContactPersonById = async (req, res) => {
  try {
    const deletedContactPerson = await ContactPerson.findByIdAndDelete(
      req.params.id
    );

    if (!deletedContactPerson) {
      return res.status(404).json({
        success: false,
        message: "Contact Person not found",
      });
    }

    // Remove the contact person's id from the client's contactPersons array
    const updatedClient = await Client.findByIdAndUpdate(
      deletedContactPerson.clientId,
      { $pull: { contactPersons: deletedContactPerson._id } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Contact Person deleted successfully",
      data: deletedContactPerson,
      updatedClient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete Contact Person",
      error: error.message,
    });
  }
};

module.exports = {
  createContactPerson,
  getAllContactPersons,
  getContactPersonById,
  updateContactPersonById,
  deleteContactPersonById,
};

// const ContactPerson = require("../models/contactPersonModel");
// const Client = require("../models/clientModel");

// const createContactPerson = async (req, res) => {
//   console.log("New contact person request body:", req.body);

//   // Remove _id field from req.body if present
//   delete req.body._id;

//   // Create a new instance of ContactPerson
//   const contactPerson = new ContactPerson(req.body);

//   // Save the contact person to get the generated _id
//   contactPerson
//     .save()
//     .then((newContactPerson) => {
//       console.log("Contact Person created successfully:", newContactPerson);

//       // Extract clientId and contactPersonId from the newly created contact person
//       const clientId = req.body.clientId; // Assuming clientId is passed in req.body
//       const contactPersonId = newContactPerson._id;

//       // Fetch the current client document to get the existing contactPersonIds array
//       Client.findById(clientId)
//         .then((client) => {
//           let existingContactPersonIds = client.contactPersons || [];

//           // Add the new contactPersonId to the existing array if not already present
//           if (!existingContactPersonIds.includes(contactPersonId)) {
//             existingContactPersonIds.push(contactPersonId);
//           }

//           console.log("Updated Contact Person IDs:", existingContactPersonIds);

//           // Update the client document with the updated contactPersonIds array
//           client.contactPersons = existingContactPersonIds;
//           client
//             .save()
//             .then((updatedClient) => {
//               console.log(
//                 "Client document updated with contactPersonId:",
//                 updatedClient
//               );

//               res.status(201).json({
//                 success: true,
//                 message: "Contact Person created and linked successfully",
//                 data: updatedClient,
//               });
//             })
//             .catch((error) => {
//               console.error("Error updating client document:", error);
//               res.status(500).json({
//                 success: false,
//                 message: "Failed to update client document",
//                 error: error.message,
//               });
//             });
//         })
//         .catch((error) => {
//           console.error("Error fetching client document:", error);
//           res.status(500).json({
//             success: false,
//             message: "Failed to fetch client document",
//             error: error.message,
//           });
//         });
//     })
//     .catch((error) => {
//       console.error("Error creating contact person:", error);
//       res.status(500).json({
//         success: false,
//         message: "Failed to create contact person",
//         error: error.message,
//       });
//     });
// };

// // Get all Contact Persons
// const getAllContactPersons = async (req, res) => {
//   try {
//     console.log("sdfsd " + req.params.clientId);
//     const client = await Client.findById(req.params.clientId)
//       .populate({
//         path: "contactPersons",
//         model: "ContactPerson",
//         options: { strictPopulate: true },
//       })
//       .exec();

//     // Check if the client exists
//     if (!client) {
//       const errorResponse = {
//         success: false,
//         message: "Client not found",
//         data: null,
//         error: "Client not found",
//       };
//       return res.status(404).json(errorResponse);
//     }

//     const successResponse = {
//       success: true,
//       message: "Contact Person retrieved successfully",
//       data: client, // Assuming clientContactAddress holds the addresses
//       error: null,
//     };
//     res.status(200).json(successResponse);
//   } catch (error) {
//     const errorResponse = {
//       success: false,
//       message: "Failed to fetch contact persons",
//       data: null,
//       error: error.message,
//     };
//     res.status(500).json(errorResponse);
//   }
// };

// // Get a Contact Person by ID
// const getContactPersonById = async (req, res) => {
//   try {
//     const contactPersonId = req.params.id;
//     const foundContact = await ContactPerson.findById(contactPersonId);
//     if (!foundContact) {
//       return res.status(404).json({
//         success: false,
//         message: "Contact Person not found",
//       });
//     }
//     res.status(200).json({
//       success: true,
//       message: "Contact person retrieved successfully",
//       data: foundContact,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch  Contact Person",
//       error: error.message,
//     });
//   }
// };

// // Update a Contact Person by ID
// const updateContactPersonById = async (req, res) => {
//   try {
//     const contactPersonId = req.params.id;
//     const updatedContactPerson = await ContactPerson.findByIdAndUpdate(
//       contactPersonId,
//       req.body,
//       { new: true }
//     );
//     if (!updatedContactPerson) {
//       return res.status(404).json({
//         success: false,
//         message: "Contact Person not found",
//       });
//     }
//     res.status(200).json({
//       success: true,
//       message: "Contact Person updated successfully",
//       data: updatedContactPerson,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to update Contact Person",
//       error: error.message,
//     });
//   }
// };

// // // Delete a Contact Person by ID
// // const deleteContactPersonById = async (req, res) => {
// //   try {
// //     const contactPersonId = req.params.id;
// //     const deletedContactPerson = await ContactPerson.findByIdAndDelete(contactPersonId);
// //     if (!deletedContactPerson) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Contact Person not found",
// //       });
// //     }
// //     res.status(200).json({
// //       success: true,
// //       message: "Contact Person deleted successfully",
// //       data: deletedContactPerson,
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to delete Contact Person",
// //       error: error.message,
// //     });
// //   }
// // };
// const deleteContactPersonById = (req, res) => {
//   const contactPersonId = req.params.id;
//   let deletedContactPerson;
//   // First, delete the contact from the ContactPerson collection
//   ContactPerson.findByIdAndDelete(contactPersonId)
//     .then((deletedContactPerson) => {
//       if (!deletedContactPerson) {
//         return res.status(404).json({
//           success: false,
//           message: "Contact Person not found",
//         });
//       }

//       // Next, remove the contact from the contactPersons field in clients
//       return Client.updateOne(
//         { contactPersons: contactPersonId },
//         { $pull: { contactPersons: contactPersonId } }
//       );
//     })
//     .then((updateResult) => {
//       res.status(200).json({
//         success: true,
//         message: "Contact Person deleted successfully",
//         data: deletedContactPerson,
//         updatedClient: updateResult,
//       });
//     })
//     .catch((error) => {
//       res.status(500).json({
//         success: false,
//         message: "Failed to delete Contact Person",
//         error: error.message,
//       });
//     });
// };

// module.exports = {
//   createContactPerson,
//   getAllContactPersons,
//   getContactPersonById,
//   updateContactPersonById,
//   deleteContactPersonById,
// };
