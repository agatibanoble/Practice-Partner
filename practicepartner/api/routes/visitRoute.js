const express = require("express");
const router = express.Router();
const {
  createVisit,
  getAllVisits,
  getVisitById,
  updateVisitById,
  deleteVisitById,
} = require("../controllers/visitController");

// Create a new visit
router.post("/createVisit", createVisit);

// Get all visits
router.get("/getVisits", getAllVisits);

// Get a visit by ID
router.get("/getVisitById/:id", getVisitById);

// Update a visit by ID
router.put("/updateVisitById/:id", updateVisitById);

// Delete a visit by ID
router.delete("/deleteVisitById/:id", deleteVisitById);

module.exports = router;
