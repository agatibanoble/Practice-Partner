const PartyType = require("../models/partyTypeModel");

// Create a new party type
const createPartyType = async (req, res) => {
  try {
    const newPartyType = await PartyType.create(req.body);
    res.status(201).json({
      success: true,
      message: "Party type created successfully",
      data: newPartyType,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create party type",
      error: error.message,
    });
  }
};

// Get all party types
const getAllPartyTypes = async (req, res) => {
  try {
    const partyTypes = await PartyType.find();
    res.status(200).json({
      success: true,
      message: "Party types retrieved successfully",
      data: partyTypes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch party types",
      error: error.message,
    });
  }
};

// Get a party type by ID
const getPartyTypeById = async (req, res) => {
  try {
    const partyTypeId = req.params.id;
    const foundPartyType = await PartyType.findById(partyTypeId);
    if (!foundPartyType) {
      return res.status(404).json({
        success: false,
        message: "Party type not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Party type retrieved successfully",
      data: foundPartyType,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch party type",
      error: error.message,
    });
  }
};

// Update a party type by ID
const updatePartyTypeById = async (req, res) => {
  try {
    const partyTypeId = req.params.id;
    const updatedPartyType = await PartyType.findByIdAndUpdate(
      partyTypeId,
      req.body,
      { new: true }
    );
    if (!updatedPartyType) {
      return res.status(404).json({
        success: false,
        message: "Party type not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Party type updated successfully",
      data: updatedPartyType,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update party type",
      error: error.message,
    });
  }
};

// Delete a party type by ID
const deletePartyTypeById = async (req, res) => {
  try {
    const partyTypeId = req.params.id;
    const deletedPartyType = await PartyType.findByIdAndDelete(partyTypeId);
    if (!deletedPartyType) {
      return res.status(404).json({
        success: false,
        message: "Party type not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Party type deleted successfully",
      data: deletedPartyType,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete party type",
      error: error.message,
    });
  }
};

module.exports = {
  createPartyType,
  getAllPartyTypes,
  getPartyTypeById,
  updatePartyTypeById,
  deletePartyTypeById,
};
