const Dispatch = require("../models/dispatchModel");

// Get all dispatches
// const getAllDispatches = function (req, res) {
//   // Retrieve all dispatches from the database
//   Dispatch.find()
//     .populate("client documentType") // Populate related fields
//     .then((dispatches) => {
//       // Send a success response with the list of dispatches
//       const successResponse = {
//         success: true,
//         message: "Dispatches retrieved successfully",
//         data: dispatches,
//         error: null,
//       };
//       res.status(200).json(successResponse);
//     })
//     .catch((error) => {
//       // Send an error response if an error occurs while fetching dispatches
//       const errorResponse = {
//         success: false,
//         message: "There was an error retrieving dispatches",
//         data: null,
//         error: error.message,
//       };
//       res.status(500).json(errorResponse);
//     });
// };

const getAllDispatches = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const searchTerm = req.query.searchTerm || "";

    const startIndex = (page - 1) * limit;
    const regex = new RegExp(searchTerm, "i");
    const query = {
      $or: [
        { "client.clientName": { $regex: regex } },
        { "documentType.documentTypeName": { $regex: regex } },
        { dispatchNumber: { $regex: regex } },
        // { clientName: { $regex: regex } },
        { dispatchNote: { $regex: regex } },
      ],
    };

    const totalCount = await Dispatch.countDocuments(query);
    const dispatches = await Dispatch.find(query)
      .populate("client documentType")
      .limit(limit)
      .skip(startIndex);

    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    };

    const successResponse = {
      success: true,
      message: "Dispatches retrieved successfully",
      count: dispatches.length,
      pagination: pagination,
      data: dispatches,
    };
    res.status(200).json(successResponse);
  } catch (error) {
    const errorResponse = {
      success: false,
      message: "There was an error retrieving dispatches",
      data: null,
      error: error.message,
    };
    res.status(500).json(errorResponse);
  }
};

// Get a dispatch by ID
const getDispatchById = function (req, res) {
  // Find a dispatch by ID
  Dispatch.findById(req.params.id)
    .populate("client documentType deliveryType") // Populate related fields
    .then((dispatch) => {
      // Check if the dispatch exists
      if (!dispatch) {
        const errorResponse = {
          success: false,
          message: "Dispatch not found",
          data: null,
          error: "Dispatch not found",
        };
        return res.status(404).json(errorResponse);
      }
      // Send a success response with the dispatch details
      const successResponse = {
        success: true,
        message: "Dispatch retrieved successfully",
        data: dispatch,
        error: null,
      };
      res.status(200).json(successResponse);
    })
    .catch((error) => {
      // Send an error response if an error occurs while fetching the dispatch
      const errorResponse = {
        success: false,
        message: "There was an error retrieving dispatch",
        data: null,
        error: error.message,
      };
      res.status(500).json(errorResponse);
    });
};

// Create a new dispatch
const createDispatch = function (req, res) {
  // Create a new dispatch instance using the request body
  const dispatch = new Dispatch(req.body);

  // Save the dispatch to the database
  dispatch
    .save()
    .then((dispatch) => {
      // If the dispatch is successfully saved, send a success response
      const successResponse = {
        success: true,
        message: "Dispatch created successfully",
        data: dispatch,
        error: null,
      };
      res.json(successResponse);
    })
    .catch((error) => {
      // If an error occurs during dispatch creation or saving, handle it here
      console.error("Error creating dispatch:", error);

      // Send an error response
      const errorResponse = {
        success: false,
        message: "Failed to create dispatch",
        data: null,
        error: error.message,
      };
      res.status(500).json(errorResponse);
    });
};

// Update an existing dispatch
const updateDispatchById = function (req, res) {
  // Find and update the dispatch by ID
  Dispatch.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .populate("client documentType deliveryType") // Populate related fields
    .then((dispatch) => {
      // Check if the dispatch exists
      if (!dispatch) {
        const errorResponse = {
          success: false,
          message: "Dispatch not found",
          data: null,
          error: "Dispatch not found",
        };
        return res.status(404).json(errorResponse);
      }
      // Send a success response if the dispatch is updated successfully
      const successResponse = {
        success: true,
        message: "Dispatch updated successfully",
        data: dispatch,
        error: null,
      };
      res.json(successResponse);
    })
    .catch((error) => {
      console.error("Error updating dispatch:", error);
      // Send an error response if an error occurs during dispatch update
      const errorResponse = {
        success: false,
        message: "Failed to update dispatch",
        data: null,
        error: error.message,
      };
      res.status(500).json(errorResponse);
    });
};

// Delete a dispatch by ID
const deleteDispatchById = function (req, res) {
  // Find and delete the dispatch by ID
  Dispatch.findByIdAndDelete(req.params.id)
    .then((dispatch) => {
      // Check if the dispatch exists
      if (!dispatch) {
        const errorResponse = {
          success: false,
          message: "Dispatch not found",
          data: null,
          error: "Dispatch not found",
        };
        return res.status(404).json(errorResponse);
      }
      // Send a success response if the dispatch is deleted successfully
      const successResponse = {
        success: true,
        message: "Dispatch deleted successfully",
        data: dispatch,
        error: null,
      };
      res.status(200).json(successResponse);
    })
    .catch((error) => {
      // Send an error response if an error occurs while deleting the dispatch
      const errorResponse = {
        success: false,
        message: "There was an error deleting dispatch",
        data: null,
        error: error.message,
      };
      res.status(500).json(errorResponse);
    });
};

// Export all functions
module.exports = {
  createDispatch,
  updateDispatchById,
  getAllDispatches,
  getDispatchById,
  deleteDispatchById,
};
