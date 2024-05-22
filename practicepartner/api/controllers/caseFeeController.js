const CaseFee = require("../models/caseFeeModel");

// Create a new case fee
const createCaseFee = async (req, res) => {
  try {
    const newFee = await CaseFee.create(req.body);
    res.status(201).json({
      success: true,
      message: "Case fee created successfully",
      data: newFee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create case fee",
      error: error.message,
    });
  }
};

// Get all case fees
const getAllCaseFees = async (req, res) => {
  try {
    const fees = await CaseFee.find();
    res.status(200).json({
      success: true,
      message: "Case fees retrieved successfully",
      data: fees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch case fees",
      error: error.message,
    });
  }
};

// Get a case fee by ID
const getCaseFeeById = async (req, res) => {
  try {
    const feeId = req.params.id;
    const foundFee = await CaseFee.findById(feeId);
    if (!foundFee) {
      return res.status(404).json({
        success: false,
        message: "Case fee not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Case fee retrieved successfully",
      data: foundFee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch case fee",
      error: error.message,
    });
  }
};

// Update a case fee by ID
const updateCaseFeeById = async (req, res) => {
  try {
    const feeId = req.params.id;
    const updatedFee = await CaseFee.findByIdAndUpdate(feeId, req.body, {
      new: true,
    });
    if (!updatedFee) {
      return res.status(404).json({
        success: false,
        message: "Case fee not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Case fee updated successfully",
      data: updatedFee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update case fee",
      error: error.message,
    });
  }
};

// Delete a case fee by ID
const deleteCaseFeeById = async (req, res) => {
  try {
    const feeId = req.params.id;
    const deletedFee = await CaseFee.findByIdAndDelete(feeId);
    if (!deletedFee) {
      return res.status(404).json({
        success: false,
        message: "Case fee not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Case fee deleted successfully",
      data: deletedFee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete case fee",
      error: error.message,
    });
  }
};

module.exports = {
  createCaseFee,
  getAllCaseFees,
  getCaseFeeById,
  updateCaseFeeById,
  deleteCaseFeeById,
};
