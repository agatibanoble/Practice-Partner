const Lawyer = require("../models/lawyerModel");

// Create a new lawyer
const createLawyer = async (req, res) => {
  try {
    const newLawyer = await Lawyer.create(req.body);
    res.status(201).json({
      success: true,
      message: "Lawyer created successfully",
      data: newLawyer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create lawyer",
      error: error.message,
    });
  }
};

// Get all lawyers
const getAllLawyers = async (req, res) => {
  try {
    const lawyers = await Lawyer.find();
    res.status(200).json({
      success: true,
      message: "Lawyers retrieved successfully",
      data: lawyers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch lawyers",
      error: error.message,
    });
  }
};

// Get a lawyer by ID
const getLawyerById = async (req, res) => {
  try {
    const lawyerId = req.params.id;
    const foundLawyer = await Lawyer.findById(lawyerId);
    if (!foundLawyer) {
      return res.status(404).json({
        success: false,
        message: "Lawyer not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Lawyer retrieved successfully",
      data: foundLawyer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch lawyer",
      error: error.message,
    });
  }
};

// Update a lawyer by ID
const updateLawyerById = async (req, res) => {
  try {
    const lawyerId = req.params.id;
    const updatedLawyer = await Lawyer.findByIdAndUpdate(lawyerId, req.body, {
      new: true,
    });
    if (!updatedLawyer) {
      return res.status(404).json({
        success: false,
        message: "Lawyer not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Lawyer updated successfully",
      data: updatedLawyer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update lawyer",
      error: error.message,
    });
  }
};

// Delete a lawyer by ID
const deleteLawyerById = async (req, res) => {
  try {
    const lawyerId = req.params.id;
    const deletedLawyer = await Lawyer.findByIdAndDelete(lawyerId);
    if (!deletedLawyer) {
      return res.status(404).json({
        success: false,
        message: "Lawyer not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Lawyer deleted successfully",
      data: deletedLawyer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete lawyer",
      error: error.message,
    });
  }
};

module.exports = {
  createLawyer,
  getAllLawyers,
  getLawyerById,
  updateLawyerById,
  deleteLawyerById,
};
