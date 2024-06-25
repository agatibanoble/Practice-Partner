const CaseConference = require("../models/caseConferenceModel");
const Case = require("../models/caseModel");
// Create a new caseConference
const createCaseConference = async (req, res) => {
  try {
    // Create a new instance of CaseConference
    const caseConference = await CaseConference.create(req.body);

    // Extract caseId from the request body
    const caseId = req.body.case;

    // Add the new conference's id to the case's caseConference array
    const updatedCase = await Case.findByIdAndUpdate(
      caseId,
      { $addToSet: { caseConference: caseConference._id } },
      { new: true }
    );

    // console.log(updatedCase.caseConference);
    res.status(201).json({
      success: true,
      message: "Contact Person created and linked successfully",
      data: { caseConference, updatedCase },
    });
  } catch (error) {
    console.error("Error creating conference:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create conference",
      error: error.message,
    });
  }
};

// Get all caseConference
const getSelectedCaseConferences = async (req, res) => {
  try {
    const caseConference = await CaseConference.find({
      case: req.params.caseId,
    })
      .populate({
        path: "case",
        model: "Case",
        options: { strictPopulate: true }, // Set strictPopulate based on your schema
      })
      .exec();

    res.status(200).json({
      success: true,
      message: "Coference retrieved successfully",
      data: caseConference,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch caseConference",
      error: error.message,
    });
  }
};

// Get all caseConference
const getAllCaseConferences = async (req, res) => {
  try {
    const caseConference = await CaseConference.find({
      case: req.params.caseId,
    })
      .populate({
        path: "case",
        model: "Case",
        options: { strictPopulate: true }, // Set strictPopulate based on your schema
      })
      .exec();

    res.status(200).json({
      success: true,
      message: "Coference retrieved successfully",
      data: caseConference,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch caseConference",
      error: error.message,
    });
  }
};

// Get a caseConference by ID
const getCaseConferenceById = async (req, res) => {
  try {
    const caseConference = await CaseConference.find({
      case: req.params.caseId,
    })
      .populate({
        path: "case",
        model: "Case",
        options: { strictPopulate: true }, // Set strictPopulate based on your schema
      })
      .exec();

    res.status(200).json({
      success: true,
      message: "Coference retrieved successfully",
      data: caseConference,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch caseConference",
      error: error.message,
    });
  }
};

// Update a caseConference by ID
const updateCaseConferenceById = async (req, res) => {
  try {
    const caseConferenceId = req.params.id;
    const updatedCaseConference = await CaseConference.findByIdAndUpdate(
      caseConferenceId,
      req.body,
      { new: true }
    );
    if (!updatedCaseConference) {
      return res.status(404).json({
        success: false,
        message: "Case Conference not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Case Conference updated successfully",
      data: updatedCaseConference,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update caseConference",
      error: error.message,
    });
  }
};

// Delete a caseConference by ID
const deleteCaseConferenceById = async (req, res) => {
  try {
    const caseConferenceId = req.params.id;
    const deletedCaseConference = await CaseConference.findByIdAndDelete(
      caseConferenceId
    );
    if (!deletedCaseConference) {
      return res.status(404).json({
        success: false,
        message: "CaseConference not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "CaseConference deleted successfully",
      data: deletedCaseConference,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete caseConference",
      error: error.message,
    });
  }
};

module.exports = {
  createCaseConference,
  getSelectedCaseConferences,
  getAllCaseConferences,
  getCaseConferenceById,
  updateCaseConferenceById,
  deleteCaseConferenceById,
};
