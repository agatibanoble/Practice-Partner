const Visitor = require("../models/visitorModel");

// Create a new visitor
const createVisitor = async (req, res) => {
  try {
    const newVisitor = await Visitor.create(req.body);
    res.status(201).json({
      success: true,
      message: "Visitor created successfully",
      data: newVisitor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create visitor",
      error: error.message,
    });
  }
};

// Get all visitors
const getAllVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find();
    res.status(200).json({
      success: true,
      message: "Visitors retrieved successfully",
      data: visitors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch visitors",
      error: error.message,
    });
  }
};

// Get a visitor by ID
const getVisitorById = async (req, res) => {
  try {
    const visitorId = req.params.id;
    const foundVisitor = await Visitor.findById(visitorId);
    if (!foundVisitor) {
      return res.status(404).json({
        success: false,
        message: "Visitor not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Visitor retrieved successfully",
      data: foundVisitor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch visitor",
      error: error.message,
    });
  }
};

// Update a visitor by ID
const updateVisitorById = async (req, res) => {
  try {
    const visitorId = req.params.id;
    const updatedVisitor = await Visitor.findByIdAndUpdate(
      visitorId,
      req.body,
      { new: true }
    );
    if (!updatedVisitor) {
      return res.status(404).json({
        success: false,
        message: "Visitor not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Visitor updated successfully",
      data: updatedVisitor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update visitor",
      error: error.message,
    });
  }
};

// Delete a visitor by ID
const deleteVisitorById = async (req, res) => {
  try {
    const visitorId = req.params.id;
    const deletedVisitor = await Visitor.findByIdAndDelete(visitorId);
    if (!deletedVisitor) {
      return res.status(404).json({
        success: false,
        message: "Visitor not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Visitor deleted successfully",
      data: deletedVisitor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete visitor",
      error: error.message,
    });
  }
};

module.exports = {
  createVisitor,
  getAllVisitors,
  getVisitorById,
  updateVisitorById,
  deleteVisitorById,
};
