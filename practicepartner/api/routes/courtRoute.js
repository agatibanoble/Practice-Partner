const express = require("express");
const router = express.Router();
const {
  createCourt,
  getAllCourts,
  getCourtById,
  updateCourtById,
  deleteCourtById,
} = require("../controllers/courtController");

// Create a new court
router.post("/create", createCourt);

// Get all courts
router.get("/get", getAllCourts);

// Get a court by ID
router.get("/get/:id", getCourtById);

// Update a court by ID
router.put("/update/:id", updateCourtById);

// Delete a court by ID
router.delete("/delete/:id", deleteCourtById);

module.exports = router;
