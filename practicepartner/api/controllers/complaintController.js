// Import the Complaint model or any necessary modules
const Complaint = require("../models/complaintModel");

// Create a new complaint
const createComplaint = async (req, res) => {
  try {
    const complaint = new Complaint(req.body);
    const savedComplaint = await complaint.save();
    res.status(201).json({
      success: true,
      message: "Complaint created successfully",
      data: savedComplaint,
      error: null,
    });
  } catch (error) {
    console.error("Error creating complaint:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create complaint",
      data: null,
      error: error.message,
    });
  }
};

// Get all complaints
const getAllComplaints = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const searchTerm = req.query.searchTerm || "";

    const startIndex = (page - 1) * limit;
    const regex = new RegExp(searchTerm, "i");
    const query = { title: { $regex: regex } }; // Assuming title field for search

    const totalCount = await Complaint.countDocuments(query);
    const complaints = await Complaint.find(query)
      .populate("department")
      .limit(limit)
      .skip(startIndex);

    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    };

    const successResponse = {
      success: true,
      message: "Complaints retrieved successfully",
      count: complaints.length,
      pagination: pagination,
      data: complaints,
    };
    res.status(200).json(successResponse);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving complaints",
      error: error.message,
    });
  }
};

// Get a complaint by ID
const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
        data: null,
        error: "Complaint not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Complaint retrieved successfully",
      data: complaint,
      error: null,
    });
  } catch (error) {
    console.error("Error getting complaint by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve complaint",
      data: null,
      error: error.message,
    });
  }
};

// Update a complaint by ID
const updateComplaintById = async (req, res) => {
  try {
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedComplaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
        data: null,
        error: "Complaint not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Complaint updated successfully",
      data: updatedComplaint,
      error: null,
    });
  } catch (error) {
    console.error("Error updating complaint:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update complaint",
      data: null,
      error: error.message,
    });
  }
};

// Delete a complaint by ID
const deleteComplaintById = async (req, res) => {
  try {
    const deletedComplaint = await Complaint.findByIdAndDelete(req.params.id);
    if (!deletedComplaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
        data: null,
        error: "Complaint not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Complaint deleted successfully",
      data: deletedComplaint,
      error: null,
    });
  } catch (error) {
    console.error("Error deleting complaint:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete complaint",
      data: null,
      error: error.message,
    });
  }
};

// Export all functions
module.exports = {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  updateComplaintById,
  deleteComplaintById,
};
