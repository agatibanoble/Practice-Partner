const CaseEvent = require("../models/CaseEventModel");

// Create a new case event
const createCaseEvent = async (req, res) => {
  try {
    const newEvent = await CaseEvent.create(req.body);
    res.status(201).json({
      success: true,
      message: "Case event created successfully",
      data: newEvent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create case event",
      error: error.message,
    });
  }
};

// Get all case events
const getAllCaseEvents = async (req, res) => {
  try {
    const events = await CaseEvent.find();
    res.status(200).json({
      success: true,
      message: "Case events retrieved successfully",
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch case events",
      error: error.message,
    });
  }
};

// Get a case event by ID
const getCaseEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const foundEvent = await CaseEvent.findById(eventId);
    if (!foundEvent) {
      return res.status(404).json({
        success: false,
        message: "Case event not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Case event retrieved successfully",
      data: foundEvent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch case event",
      error: error.message,
    });
  }
};

// Update a case event by ID
const updateCaseEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const updatedEvent = await CaseEvent.findByIdAndUpdate(eventId, req.body, {
      new: true,
    });
    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        message: "Case event not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Case event updated successfully",
      data: updatedEvent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update case event",
      error: error.message,
    });
  }
};

// Delete a case event by ID
const deleteCaseEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const deletedEvent = await CaseEvent.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      return res.status(404).json({
        success: false,
        message: "Case event not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Case event deleted successfully",
      data: deletedEvent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete case event",
      error: error.message,
    });
  }
};

module.exports = {
  createCaseEvent,
  getAllCaseEvents,
  getCaseEventById,
  updateCaseEventById,
  deleteCaseEventById,
};
