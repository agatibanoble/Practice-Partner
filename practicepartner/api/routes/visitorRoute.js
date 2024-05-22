const express = require("express");
const router = express.Router();
const {
  createVisitor,
  getAllVisitors,
  getVisitorById,
  updateVisitorById,
  deleteVisitorById,
} = require("../controllers/visitorController");

// Create a new visitor
router.post("/createVisitor", createVisitor);

// Get all visitors
router.get("/getVisitors", getAllVisitors);

// Get a visitor by ID
router.get("/getVisitorById/:id", getVisitorById);

// Update a visitor by ID
router.put("/updateVisitorById/:id", updateVisitorById);

// Delete a visitor by ID
router.delete("/deleteVisitorById/:id", deleteVisitorById);

module.exports = router;
