const Court = require("../models/CourtModel");

// Create a new court
const createCourt = async (req, res) => {
  try {
    const newCourt = await Court.create(req.body);
    res.status(201).json({
      success: true,
      message: "Court created successfully",
      data: newCourt,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create court",
      error: error.message,
    });
  }
};

// Get all courts
const getAllCourts = async (req, res) => {
  try {
    const courts = await Court.find();
    res.status(200).json({
      success: true,
      message: "Courts retrieved successfully",
      data: courts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch courts",
      error: error.message,
    });
  }
};

// Get a court by ID
const getCourtById = async (req, res) => {
  try {
    const courtId = req.params.id;
    const foundCourt = await Court.findById(courtId);
    if (!foundCourt) {
      return res.status(404).json({
        success: false,
        message: "Court not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Court retrieved successfully",
      data: foundCourt,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch court",
      error: error.message,
    });
  }
};

// Update a court by ID
const updateCourtById = async (req, res) => {
  try {
    const courtId = req.params.id;
    const updatedCourt = await Court.findByIdAndUpdate(courtId, req.body, {
      new: true,
    });
    if (!updatedCourt) {
      return res.status(404).json({
        success: false,
        message: "Court not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Court updated successfully",
      data: updatedCourt,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update court",
      error: error.message,
    });
  }
};

// Delete a court by ID
const deleteCourtById = async (req, res) => {
  try {
    const courtId = req.params.id;
    const deletedCourt = await Court.findByIdAndDelete(courtId);
    if (!deletedCourt) {
      return res.status(404).json({
        success: false,
        message: "Court not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Court deleted successfully",
      data: deletedCourt,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete court",
      error: error.message,
    });
  }
};

module.exports = {
  createCourt,
  getAllCourts,
  getCourtById,
  updateCourtById,
  deleteCourtById,
};
