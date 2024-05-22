const express = require("express");
const router = express.Router();
const {
  createLawyer,
  getAllLawyers,
  getLawyerById,
  updateLawyerById,
  deleteLawyerById,
} = require("../controllers/lawyerController");

// Create a new lawyer
router.post("/createLawyer", createLawyer);

// Get all lawyers
router.get("/getLawyers", getAllLawyers);

// Get a lawyer by ID
router.get("/getLawyerById/:id", getLawyerById);

// Update a lawyer by ID
router.put("/updateLawyerById/:id", updateLawyerById);

// Delete a lawyer by ID
router.delete("/deleteLawyerById/:id", deleteLawyerById);

module.exports = router;
