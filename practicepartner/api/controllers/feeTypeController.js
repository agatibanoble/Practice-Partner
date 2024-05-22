const FeeType = require("../models/FeeTypeModel");

// Create a new fee type
const createFeeType = async (req, res) => {
  try {
    const newFeeType = await FeeType.create(req.body);
    res.status(201).json({
      success: true,
      message: "Fee type created successfully",
      data: newFeeType,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create fee type",
      error: error.message,
    });
  }
};

// Get all fee types
const getAllFeeTypes = async (req, res) => {
  try {
    const feeTypes = await FeeType.find();
    res.status(200).json({
      success: true,
      message: "Fee types retrieved successfully",
      data: feeTypes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch fee types",
      error: error.message,
    });
  }
};

// Get a fee type by ID
const getFeeTypeById = async (req, res) => {
  try {
    const feeTypeId = req.params.id;
    const foundFeeType = await FeeType.findById(feeTypeId);
    if (!foundFeeType) {
      return res.status(404).json({
        success: false,
        message: "Fee type not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Fee type retrieved successfully",
      data: foundFeeType,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch fee type",
      error: error.message,
    });
  }
};

// Update a fee type by ID
const updateFeeTypeById = async (req, res) => {
  try {
    const feeTypeId = req.params.id;
    const updatedFeeType = await FeeType.findByIdAndUpdate(
      feeTypeId,
      req.body,
      { new: true }
    );
    if (!updatedFeeType) {
      return res.status(404).json({
        success: false,
        message: "Fee type not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Fee type updated successfully",
      data: updatedFeeType,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update fee type",
      error: error.message,
    });
  }
};

// Delete a fee type by ID
const deleteFeeTypeById = async (req, res) => {
  try {
    const feeTypeId = req.params.id;
    const deletedFeeType = await FeeType.findByIdAndDelete(feeTypeId);
    if (!deletedFeeType) {
      return res.status(404).json({
        success: false,
        message: "Fee type not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Fee type deleted successfully",
      data: deletedFeeType,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete fee type",
      error: error.message,
    });
  }
};

module.exports = {
  createFeeType,
  getAllFeeTypes,
  getFeeTypeById,
  updateFeeTypeById,
  deleteFeeTypeById,
};
