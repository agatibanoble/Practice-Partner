const Judge = require("../models/judgeModel");

// Create a new judge
const createJudge = async (req, res) => {
  try {
    const newJudge = await Judge.create(req.body);
    res.status(201).json({
      success: true,
      message: "Judge created successfully",
      data: newJudge,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create judge",
      error: error.message,
    });
  }
};

// Get all judges
const getAllJudges = async (req, res) => {
  try {
    const judges = await Judge.find();
    res.status(200).json({
      success: true,
      message: "Judges retrieved successfully",
      data: judges,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch judges",
      error: error.message,
    });
  }
};

// Get a judge by ID
const getJudgeById = async (req, res) => {
  try {
    const judgeId = req.params.id;
    const foundJudge = await Judge.findById(judgeId);
    if (!foundJudge) {
      return res.status(404).json({
        success: false,
        message: "Judge not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Judge retrieved successfully",
      data: foundJudge,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch judge",
      error: error.message,
    });
  }
};

// Update a judge by ID
const updateJudgeById = async (req, res) => {
  try {
    const judgeId = req.params.id;
    const updatedJudge = await Judge.findByIdAndUpdate(judgeId, req.body, {
      new: true,
    });
    if (!updatedJudge) {
      return res.status(404).json({
        success: false,
        message: "Judge not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Judge updated successfully",
      data: updatedJudge,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update judge",
      error: error.message,
    });
  }
};

// Delete a judge by ID
const deleteJudgeById = async (req, res) => {
  try {
    const judgeId = req.params.id;
    const deletedJudge = await Judge.findByIdAndDelete(judgeId);
    if (!deletedJudge) {
      return res.status(404).json({
        success: false,
        message: "Judge not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Judge deleted successfully",
      data: deletedJudge,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete judge",
      error: error.message,
    });
  }
};

module.exports = {
  createJudge,
  getAllJudges,
  getJudgeById,
  updateJudgeById,
  deleteJudgeById,
};
