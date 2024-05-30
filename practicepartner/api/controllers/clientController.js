const Client = require("../models/clientModel");
const ContactAddress = require("../models/contactAddressModel");
const ContactPerson = require("../models/contactPersonModel");

const getAllClients = async (req, res) => {

  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const searchTerm = req.query.searchTerm || "";

    const startIndex = (page - 1) * limit;
    const regex = new RegExp(searchTerm, "i");
    const query = { clientName: { $regex: regex } };

    const totalCount = await Client.countDocuments(query);
    const clients = await Client.find(query)
      .populate("clientCategory")
      .populate("contactAddresses")
      .populate("contactPersons")
      .populate("cases")
      .limit(limit)
      .skip(startIndex);

    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    };

    const successResponse = {
      success: true,
      message: "Clients retrieved successfully",
      count: clients.length,
      pagination: pagination,
      data: clients,
    };
    res.status(200).json(successResponse);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving clients",
      error: error.message,
    });
  }
};

const searchClients = async (req, res) => {
  try {
    const searchItem = req.query.searchItem?.toString();
    const clients = await Client.find({
      $or: [
        { clientName: { $regex: searchItem, $options: "i" } },
        { clientNumber: { $regex: searchItem, $options: "i" } },
      ],
    }).populate("clientCategory");

    const successResponse = {
      success: true,
      message: "Search data retrieved successfully",
      data: clients,
    };
    res.status(200).json(successResponse);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id)
      .populate("clientCategory")
      .populate("contactAddresses")
      .populate("contactPersons")
      .populate("cases");

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    const successResponse = {
      success: true,
      message: "Client retrieved successfully",
      data: client,
    };
    res.status(200).json(successResponse);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving client",
      error: error.message,
    });
  }
};

const createClient = async (req, res) => {
  try {
    const existingClient = await Client.findOne({
      clientNumber: req.body.clientNumber,
    });

    if (existingClient) {
      return res.status(400).json({
        success: false,
        message: "Client already exists",
      });
    }

    const client = new Client(req.body);
    await client.save();

    const successResponse = {
      success: true,
      message: "Client created successfully",
      data: client,
    };
    res.status(201).json(successResponse);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create client",
      error: error.message,
    });
  }
};

const updateClientById = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    const successResponse = {
      success: true,
      message: "Client updated successfully",
      data: client,
    };
    res.status(200).json(successResponse);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update client",
      error: error.message,
    });
  }
};

const deleteClientById = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    await ContactAddress.deleteMany({ clientId: req.params.id });
    await ContactPerson.deleteMany({ clientId: req.params.id });

    const successResponse = {
      success: true,
      message: "Client and related objects deleted successfully",
      data: client,
    };
    res.status(200).json(successResponse);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting client and related objects",
      error: error.message,
    });
  }
};

const errorHandler = (err, req, res, next) => {
  if (err.code === "ENOENT" || err.code === "ENOTFOUND") {
    return res.redirect("/error-page");
  }
  next(err);
};

module.exports = {
  createClient,
  updateClientById,
  getAllClients,
  searchClients,
  getClientById,
  deleteClientById,
  errorHandler,
};

// const Client = require("../models/clientModel");
// const ContactAddress = require("../models/contactAddressModel");
// const ContactPerson = require("../models/contactPersonModel");

// const getAllClients = function (req, res) {
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;
//   const searchTerm = req.query.searchTerm || "";

//   const startIndex = (page - 1) * limit;
//   const regex = new RegExp(searchTerm, "i");
//   const query = { clientName: { $regex: regex } }; // Example search query

//   let totalCount;

//   Client.countDocuments(query)
//     .then((count) => {
//       totalCount = count;
//       return Client.find(query)
//         .populate({
//           path: "clientCategoryId",
//           model: "ClientCategory",
//           options: { strictPopulate: true }, // Set strictPopulate to false
//         })
//         .limit(limit)
//         .skip(startIndex)
//         .exec();
//     })
//     .then((clients) => {
//       const pagination = {
//         currentPage: page,
//         totalPages: Math.ceil(totalCount / limit),
//       };

//       const successResponse = {
//         success: true,
//         message: "Clients retrieved successfully",
//         count: clients.length,
//         pagination: pagination,
//         data: clients,
//         error: null,
//       };
//       res.status(200).json(successResponse);
//     })
//     .catch((error) => {
//       const errorResponse = {
//         success: false,
//         message: "Error retrieving clients",
//         data: null,
//         error: error.message, // Include specific error message
//       };
//       res.status(500).json(errorResponse);
//     });
// };

// // Controller function to handle client search
// // Controller function to handle client search
// const searchClients = async (req, res) => {
//   try {
//     // Extract search query from request
//     const searchItem = req.query.searchItem?.toString();

//     // Perform the search using a regular expression for flexibility
//     const clients = await Client.find({
//       $or: [
//         { clientName: { $regex: searchItem, $options: "i" } }, // Case-insensitive search by name
//         { clientNumber: { $regex: searchItem, $options: "i" } }, // Case-insensitive search by email
//       ],
//     }).populate({
//       path: "clientCategoryId", // Populate the clientCategoryId field
//       model: "ClientCategory",
//       options: { strictPopulate: false }, // Set strictPopulate to false
//     });
//     console.log(clients);
//     // Send the search results as a response
//     // res.status(200).json({ success: true, data: clients });
//     const successResponse = {
//       success: true,
//       message: "Search data retrieved successfully",
//       data: clients,
//       error: null,
//     };
//     res.status(200).json(successResponse);
//   } catch (error) {
//     // Handle errors if the search fails
//     res.status(500).json({ success: false, error: error.message });
//   }
// };
// // Get a client by ID
// const getClientById = function (req, res) {
//   // Find a client by ID
//   Client.findById(req.params.id)
//     .populate({
//       path: "clientCategoryId",
//       model: "ClientCategory",
//       options: { strictPopulate: true }, // Set strictPopulate to false
//     })
//     .populate({
//       path: "contactAddresses",
//       model: "ContactAddress",
//       options: { strictPopulate: true }, // Set strictPopulate to false
//     })
//     .populate({
//       path: "contactPersons",
//       model: "ContactPerson",
//       options: { strictPopulate: true }, // Set strictPopulate to false
//     })
//     .populate({
//       path: "clientCases",
//       model: "Case",
//       options: { strictPopulate: false }, // Set strictPopulate to false
//     })
//     .exec()
//     .then((client) => {
//       // Check if the client exists
//       if (!client) {
//         const errorResponse = {
//           success: false,
//           message: "Client not found",
//           data: null,
//           error: "Client not found",
//         };
//         return res.status(404).json(errorResponse);
//       }

//       // Send a success response with the client details
//       const successResponse = {
//         success: true,
//         message: "Client retrieved successfully",
//         data: client,
//         error: null,
//       };
//       res.status(200).json(successResponse);
//     })
//     .catch((error) => {
//       // Send an error response if an error occurs while fetching the client
//       const errorResponse = {
//         success: false,
//         message: "There was an error retrieving client",
//         data: null,
//         error: error.message,
//       };
//       res.status(500).json(errorResponse);
//     });
// };

// // Create a new client
// const createClient = function (req, res, next) {
//   const client = new Client({
//     clientNumber: req.body.clientNumber,
//     clientName: req.body.clientName,
//     clientCategoryId: req.body.clientCategoryId,
//     clientType: req.body.clientType,
//     clientReferralType: req.body.clientReferralType,
//     clientDescription: req.body.clientDescription,
//   });
//   console.log(client);
//   client
//     .save()
//     .then((client) => {
//       const successResponse = {
//         success: true,
//         message: "Client created successfully",
//         data: client,
//         comment: "You can begin to add other elements of Client e.g. address",
//         error: null,
//       };
//       res.json(successResponse);
//       // });
//     })
//     .catch((error) => {
//       // If an error occurs during client creation or saving, handle it here
//       console.error("Error creating client:", error);

//       // Send an error response
//       const errorResponse = {
//         success: false,
//         message: "Failed to create client",
//         data: null,
//         error: error.message,
//       };
//       res.status(500).json(errorResponse);
//     });
// };

// // Update an existing client
// const updateClientById = function (req, res) {
//   // Find and update the client by ID
//   Client.findByIdAndUpdate(req.params.id, req.body, { upsert: true, new: true })
//     .then((client) => {
//       // Check if the client exists
//       if (!client) {
//         const errorResponse = {
//           success: false,
//           message: "Client not found",
//           data: null,
//           error: "Client not found",
//         };
//         return res.status(404).json(errorResponse);
//       }
//       // Send a success response if the client is updated successfully
//       const successResponse = {
//         success: true,
//         message: "Client updated successfully",
//         data: client,
//         comment: "Other elements of client must be updated separately",
//         error: null,
//       };
//       res.json(successResponse);
//     })
//     .catch((error) => {
//       console.error("Error updating client:", error);
//       // Send an error response if an error occurs during client update
//       // Send an error response
//       const errorResponse = {
//         success: false,
//         message: "Failed to update client",
//         data: null,
//         error: "Failed to update client",
//       };
//       res.status(500).json(errorResponse);
//     });
// };

// const deleteClientById = function (req, res) {
//   // Find and delete the client by ID
//   Client.findByIdAndDelete(req.params.id)
//     .then((client) => {
//       // Check if the client exists
//       if (!client) {
//         const errorResponse = {
//           success: false,
//           message: "Client not found",
//           data: null,
//           error: "Client not found",
//         };
//         return res.status(404).json(errorResponse);
//       }

//       // Delete related objects (e.g., contactAddress)
//       ContactAddress.findOne({ clientId: req.params.id }).then(
//         (contactAddress) => {
//           if (contactAddress) {
//             return ContactAddress.deleteMany({ clientId: req.params.id });
//           } else {
//             return Promise.resolve(); // Resolve without deleting if ContactAddress doesn't exist
//           }
//         }
//       );

//       ContactPerson.findOne({ clientId: req.params.id })

//         .then((ContactPerson) => {
//           if (ContactPerson) {
//             return ContactPerson.deleteMany({ clientId: req.params.id });
//           } else {
//             return Promise.resolve(); // Resolve without deleting if ContactPerson doesn't exist
//           }
//         })
//         .then(() => {
//           // Send a success response if the client and related objects are deleted successfully
//           const successResponse = {
//             success: true,
//             message: "Client and related objects deleted successfully",
//             data: client,
//             error: null,
//           };
//           res.status(200).json(successResponse);
//         })
//         .catch((error) => {
//           // Send an error response if an error occurs while deleting related objects
//           const errorResponse = {
//             success: false,
//             message: "There was an error deleting related objects",
//             data: null,
//             error: error.message,
//           };
//           res.status(500).json(errorResponse);
//         });
//     })
//     .catch((error) => {
//       // Send an error response if an error occurs while deleting the client
//       const errorResponse = {
//         success: false,
//         message: "There was an error deleting client",
//         data: null,
//         error: error.message,
//       };
//       res.status(500).json(errorResponse);
//     });
// };

// // Error handler middleware
// const errorHandler = function (err, req, res, next) {
//   // Redirect to error page if file not found error
//   if (err.code === "ENOENT" || err.code === "ENOTFOUND") {
//     return res.redirect("/error-page");
//   }
//   next(err);
// };

// // Export all functions
// module.exports = {
//   createClient,
//   updateClientById,
//   getAllClients,
//   searchClients,
//   getClientById,
//   deleteClientById,
//   errorHandler,
// };
