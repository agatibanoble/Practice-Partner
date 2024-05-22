const Case = require("../models/caseModel");
const Client = require("../models/clientModel");

// Create a new case
const createCase = async (req, res) => {
  try {
    const { _id, ...caseToSave } = req.body;
    const newCase = await Case.create(caseToSave);

    // Assuming req.body.clientId contains the clientId of the associated client
    const clientId = req.body.client;

    // Update the client document to include the new caseId
    const client = await Client.findById(clientId);
    if (!client) {
      throw new Error("Client not found");
    }

    // Add the new caseId to the existing array if not already present
    if (!client.cases.includes(newCase._id)) {
      client.cases.push(newCase._id);
    }

    // Save the updated client document
    const updatedClient = await client.save();

    res.status(201).json({
      success: true,
      message: "Case created and linked to client successfully",
      data: { case: newCase, client: updatedClient },
    });
  } catch (error) {
    console.error("Error creating or linking case:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create or link case",
      error: error.message,
    });
  }
};

const getAllCases = function (req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const searchTerm = req.query.searchTerm || "";

  const startIndex = (page - 1) * limit;
  const regex = new RegExp(searchTerm, "i");
  const query = { caseTitle: { $regex: regex } }; // Example search query

  console.log("Query:", query); // Debugging statement

  let totalCount;

  Case.countDocuments(query)
    .then((count) => {
      totalCount = count;
      console.log("Total Count:", totalCount); // Debugging statement
      return Case.find(query)
        .populate({
          path: "caseCategory",
          model: "CaseCategory",
          options: { strictPopulate: false }, // Set strictPopulate to false
        })
        .populate({
          path: "court",
          model: "Court",
          options: { strictPopulate: false }, // Set strictPopulate to false
        })
        .populate({
          path: "client",
          model: "Client",
          options: { strictPopulate: false }, // Set strictPopulate to false
        })
        .limit(limit)
        .skip(startIndex)
        .exec();
    })
    .then((cases) => {
      console.log("Retrieved cases:", cases); // Debugging statement
      const pagination = {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
      };
      const successResponse = {
        success: true,
        message: "Cases retrieved successfully",
        count: cases.length,
        pagination: pagination,
        data: cases,
        error: null,
      };
      res.status(200).json(successResponse);
    })
    .catch((error) => {
      console.error("Error retrieving cases:", error); // Log the entire error object
      const errorResponse = {
        success: false,
        message: "Error retrieving cases",
        data: null,
        error: error.message, // Include specific error message
      };
      res.status(500).json(errorResponse);
    });
};

const getClientCases = function (req, res) {
  const clientId = req.query.clientId || ""; // Client ID parameter

  // Query to count total documents matching the clientId
  Case.countDocuments({ clientId: clientId })
    .then((count) => {
      totalCount = count;
      return Case.find({ clientId: clientId })
        .populate({
          path: "caseCategory",
          model: "CaseCategory",
          options: { strictPopulate: false },
        })
        .populate({
          path: "court",
          model: "Court",
          options: { strictPopulate: false },
        })
        .populate({
          path: "client",
          model: "Client",
          options: { strictPopulate: false },
        })
        .exec();
    })
    .then((cases) => {
      const successResponse = {
        success: true,
        message: "Cases retrieved successfully",
        data: cases,
        error: null,
      };
      res.status(200).json(successResponse);
    })
    .catch((error) => {
      console.error("Error retrieving cases:", error);
      const errorResponse = {
        success: false,
        message: "Error retrieving cases",
        data: null,
        error: error.message,
      };
      res.status(500).json(errorResponse);
    });
};

// Get a case by ID
const getCaseById = (req, res) => {
  const caseId = req.params.id;
  Case.findById(caseId)
    .populate({
      path: "caseCategory",
      model: "CaseCategory",
    })
    .populate({
      path: "client",
      model: "Client",
    })
    .populate({
      path: "court",
      model: "Court",
    })
    .populate({
      path: "client",
      populate: {
        path: "clientCategory",
        model: "ClientCategory",
      },
    })
    .then((foundCase) => {
      if (!foundCase) {
        return res.status(404).json({
          success: false,
          message: "Case not found",
        });
      }
      console.log(foundCase);
      res.status(200).json({
        success: true,
        message: "Case retrieved successfully",
        data: foundCase,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Failed to fetch case with populated client",
        error: error.message,
      });
    });
};

// Update a case by ID
const updateCaseById = async (req, res) => {
  try {
    const caseId = req.params.id;
    const updatedCase = await Case.findByIdAndUpdate(caseId, req.body, {
      new: true,
    });
    if (!updatedCase) {
      return res.status(404).json({
        success: false,
        message: "Case not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Case updated successfully",
      data: updatedCase,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update case",
      error: error.message,
    });
  }
};

// Delete a case by ID
const deleteCaseById = async (req, res) => {
  try {
    const caseId = req.params.id;
    const deletedCase = await Case.findByIdAndDelete(caseId);
    if (!deletedCase) {
      return res.status(404).json({
        success: false,
        message: "Case not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Case deleted successfully",
      data: deletedCase,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete case",
      error: error.message,
    });
  }
};

module.exports = {
  createCase,
  getAllCases,
  getClientCases,
  getCaseById,
  updateCaseById,
  deleteCaseById,
};
