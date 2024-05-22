const Calendar = require("../models/CalendarModel");

// Create a new calendar event
const createCalendarEvent = async (req, res) => {
  try {
    const newEvent = await Calendar.create(req.body);
    res.status(201).json({
      success: true,
      message: "Calendar event created successfully",
      data: newEvent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create calendar event",
      error: error.message,
    });
  }
};

// Get all calendar events
const getAllCalendarEvents = async (req, res) => {
  try {
    const events = await Calendar.find();
    res.status(200).json({
      success: true,
      message: "Calendar events retrieved successfully",
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch calendar events",
      error: error.message,
    });
  }
};

// Get a calendar event by ID
const getCalendarEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const foundEvent = await Calendar.findById(eventId);
    if (!foundEvent) {
      return res.status(404).json({
        success: false,
        message: "Calendar event not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Calendar event retrieved successfully",
      data: foundEvent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch calendar event",
      error: error.message,
    });
  }
};

// Update a calendar event by ID
const updateCalendarEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const updatedEvent = await Calendar.findByIdAndUpdate(eventId, req.body, {
      new: true,
    });
    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        message: "Calendar event not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Calendar event updated successfully",
      data: updatedEvent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update calendar event",
      error: error.message,
    });
  }
};

// Delete a calendar event by ID
const deleteCalendarEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const deletedEvent = await Calendar.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      return res.status(404).json({
        success: false,
        message: "Calendar event not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Calendar event deleted successfully",
      data: deletedEvent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete calendar event",
      error: error.message,
    });
  }
};

module.exports = {
  createCalendarEvent,
  getAllCalendarEvents,
  getCalendarEventById,
  updateCalendarEventById,
  deleteCalendarEventById,
};
