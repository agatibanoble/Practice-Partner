const Firm = require("../models/firmModel");

// Create a new law firm
const createFirm = async (req, res) => {
  try {
    const newFirm = await Firm.create(req.body).populate({
      path: "region",
      model: "Region",
      options: { strictPopulate: false },
      populate: {
        path: "country",
        model: "Country",
        options: { strictPopulate: false },
      },
    });

    res.status(201).json({
      success: true,
      message: "Law firm created successfully",
      data: newFirm,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create law firm",
      error: error.message,
    });
  }
};

// Get all law firms
const getAllFirms = async (req, res) => {
  try {
    const lawFirms = await Firm.findOne().populate({
      path: "region",
      model: "Region",
      options: { strictPopulate: false },
      populate: {
        path: "country",
        model: "Country",
        options: { strictPopulate: false },
      },
    });
    res.status(200).json({
      success: true,
      message: "Law firms retrieved successfully",
      data: lawFirms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch law firms",
      error: error.message,
    });
  }
};

// Get a law firm by ID
const getFirmById = async (req, res) => {
  try {
    const lawFirmId = req.params.id;
    const foundFirm = await Firm.findOne().populate({
      path: "region",
      model: "Region",
      options: { strictPopulate: false },
      populate: {
        path: "country",
        model: "Country",
        options: { strictPopulate: false },
      },
    });
    if (!foundFirm) {
      return res.status(404).json({
        success: false,
        message: "Law firm not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Law firm retrieved successfully",
      data: foundFirm,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch law firm",
      error: error.message,
    });
  }
};

// Update a law firm by ID
const updateFirmById = async (req, res) => {
  try {
    const lawFirmId = req.params.id;
    const updatedFirm = await Firm.findByIdAndUpdate(lawFirmId, req.body, {
      new: true,
    }).populate({
      path: "region",
      model: "Region",
      options: { strictPopulate: false },
      populate: {
        path: "country",
        model: "Country",
        options: { strictPopulate: false },
      },
    });

    if (!updatedFirm) {
      return res.status(404).json({
        success: false,
        message: "Law firm not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Law firm updated successfully",
      data: updatedFirm,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update law firm",
      error: error.message,
    });
  }
};

// Delete a law firm by ID
const deleteFirmById = async (req, res) => {
  try {
    const lawFirmId = req.params.id;
    const deletedFirm = await Firm.findByIdAndDelete(lawFirmId);
    if (!deletedFirm) {
      return res.status(404).json({
        success: false,
        message: "Law firm not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Law firm deleted successfully",
      data: deletedFirm,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete law firm",
      error: error.message,
    });
  }
};

module.exports = {
  createFirm,
  getAllFirms,
  getFirmById,
  updateFirmById,
  deleteFirmById,
};
