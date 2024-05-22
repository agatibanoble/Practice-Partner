const EventType = require("../models/eventTypeModel");

// Get all event types
const getAllEventTypes = function (req, res) {
  EventType.find()
    .then((eventTypes) => {
      const successResponse = {
        success: true,
        message: "Event Types retrieved successfully",
        data: eventTypes,
        error: null,
      };
      res.status(200).json(successResponse);
    })
    .catch((error) => {
      const errorResponse = {
        success: false,
        message: "There was an error retrieving event types",
        data: null,
        error: error.message,
      };
      res.status(500).json(errorResponse);
    });
};

// Get a case category by ID
const getEventTypeById = function (req, res) {
  EventType.findById(req.params.id)
    .then((eventType) => {
      if (!eventType) {
        const errorResponse = {
          success: false,
          message: "Event Type not found",
          data: null,
          error: "Event Type not found",
        };
        return res.status(404).json(errorResponse);
      }
      const successResponse = {
        success: true,
        message: "Event Type retrieved successfully",
        data: eventType,
        error: null,
      };
      res.status(200).json(successResponse);
    })
    .catch((error) => {
      const errorResponse = {
        success: false,
        message: "There was an error retrieving case category",
        data: null,
        error: error.message,
      };
      res.status(500).json(errorResponse);
    });
};

// Create a new case category
const createEventType = function (req, res) {
  const eventType = new EventType(req.body);

  eventType
    .save()
    .then((eventType) => {
      const successResponse = {
        success: true,
        message: "Event Type created successfully",
        data: eventType,
        error: null,
      };
      res.json(successResponse);
    })
    .catch((error) => {
      console.error("Error creating case category:", error);
      const errorResponse = {
        success: false,
        message: "Failed to create case category",
        data: null,
        error: error.message,
      };
      res.status(500).json(errorResponse);
    });
};

// Update an existing case category
const updateEventTypeById = function (req, res) {
  EventType.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((eventType) => {
      if (!eventType) {
        const errorResponse = {
          success: false,
          message: "Event Type not found",
          data: null,
          error: "Event Type not found",
        };
        return res.status(404).json(errorResponse);
      }
      const successResponse = {
        success: true,
        message: "Event Type updated successfully",
        data: eventType,
        error: null,
      };
      res.json(successResponse);
    })
    .catch((error) => {
      console.error("Error updating case category:", error);
      const errorResponse = {
        success: false,
        message: "Failed to update case category",
        data: null,
        error: error.message,
      };
      res.status(500).json(errorResponse);
    });
};

// Delete a case category by ID
const deleteEventTypeById = function (req, res) {
  EventType.findByIdAndDelete(req.params.id)
    .then((eventType) => {
      if (!eventType) {
        const errorResponse = {
          success: false,
          message: "Event Type not found",
          data: null,
          error: "Event Type not found",
        };
        return res.status(404).json(errorResponse);
      }
      const successResponse = {
        success: true,
        message: "Event Type deleted successfully",
        data: eventType,
        error: null,
      };
      res.status(200).json(successResponse);
    })
    .catch((error) => {
      const errorResponse = {
        success: false,
        message: "There was an error deleting case category",
        data: null,
        error: error.message,
      };
      res.status(500).json(errorResponse);
    });
};

module.exports = {
  createEventType,
  updateEventTypeById,
  getAllEventTypes,
  getEventTypeById,
  deleteEventTypeById,
};
