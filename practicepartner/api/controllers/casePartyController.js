const CaseParty = require("../models/CasePartyModel");

// Create a new case party
const createCaseParty = async (req, res) => {
  try {
    const newParty = await CaseParty.create(req.body);
    res.status(201).json({
      success: true,
      message: "Case party created successfully",
      data: newParty,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create case party",
      error: error.message,
    });
  }
};

// Get all case parties
const getAllCaseParties = async (req, res) => {
  try {
    const parties = await CaseParty.find();
    res.status(200).json({
      success: true,
      message: "Case parties retrieved successfully",
      data: parties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch case parties",
      error: error.message,
    });
  }
};

// Get a case party by ID
const getCasePartyById = async (req, res) => {
  try {
    const partyId = req.params.id;
    const foundParty = await CaseParty.findById(partyId);
    if (!foundParty) {
      return res.status(404).json({
        success: false,
        message: "Case party not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Case party retrieved successfully",
      data: foundParty,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch case party",
      error: error.message,
    });
  }
};

// Update a case party by ID
const updateCasePartyById = async (req, res) => {
  try {
    const partyId = req.params.id;
    const updatedParty = await CaseParty.findByIdAndUpdate(partyId, req.body, {
      new: true,
    });
    if (!updatedParty) {
      return res.status(404).json({
        success: false,
        message: "Case party not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Case party updated successfully",
      data: updatedParty,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update case party",
      error: error.message,
    });
  }
};

// Delete a case party by ID
const deleteCasePartyById = async (req, res) => {
  try {
    const partyId = req.params.id;
    const deletedParty = await CaseParty.findByIdAndDelete(partyId);
    if (!deletedParty) {
      return res.status(404).json({
        success: false,
        message: "Case party not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Case party deleted successfully",
      data: deletedParty,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete case party",
      error: error.message,
    });
  }
};

module.exports = {
  createCaseParty,
  getAllCaseParties,
  getCasePartyById,
  updateCasePartyById,
  deleteCasePartyById,
};
