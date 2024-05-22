const Visit = require("../models/visitModel");

// Create a new visit
const createVisit = async (req, res) => {
  try {
    const newVisit = await Visit.create(req.body);
    res.status(201).json({
      success: true,
      message: "Visit created successfully",
      data: newVisit,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create visit",
      error: error.message,
    });
  }
};

// Get all visits
const getAllVisits = async (req, res) => {
  try {
    const visits = await Visit.find();
    res.status(200).json({
      success: true,
      message: "Visits retrieved successfully",
      data: visits,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch visits",
      error: error.message,
    });
  }
};

// Get a visit by ID
const getVisitById = async (req, res) => {
  try {
    const visitId = req.params.id;
    const foundVisit = await Visit.findById(visitId);
    if (!foundVisit) {
      return res.status(404).json({
        success: false,
        message: "Visit not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Visit retrieved successfully",
      data: foundVisit,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch visit",
      error: error.message,
    });
  }
};

// Update a visit by ID
const updateVisitById = async (req, res) => {
  try {
    const visitId = req.params.id;
    const updatedVisit = await Visit.findByIdAndUpdate(visitId, req.body, {
      new: true,
    });
    if (!updatedVisit) {
      return res.status(404).json({
        success: false,
        message: "Visit not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Visit updated successfully",
      data: updatedVisit,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update visit",
      error: error.message,
    });
  }
};

// Delete a visit by ID
const deleteVisitById = async (req, res) => {
  try {
    const visitId = req.params.id;
    const deletedVisit = await Visit.findByIdAndDelete(visitId);
    if (!deletedVisit) {
      return res.status(404).json({
        success: false,
        message: "Visit not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Visit deleted successfully",
      data: deletedVisit,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete visit",
      error: error.message,
    });
  }
};

module.exports = {
  createVisit,
  getAllVisits,
  getVisitById,
  updateVisitById,
  deleteVisitById,
};
