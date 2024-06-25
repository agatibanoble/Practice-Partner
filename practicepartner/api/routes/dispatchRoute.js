const express = require("express");
const router = express.Router();
const {
  createDispatch,
  getAllDispatches,
  getDispatchById,
  updateDispatchById,
  deleteDispatchById,
} = require("../controllers/dispatchController");

// Create a new dispatch
router.post("/create", createDispatch);

// Get all dispatches
router.get("/get", getAllDispatches);

// Get a dispatch by ID
router.get("/get/:id", getDispatchById);

// Update a dispatch by ID
router.post("/update/:id", updateDispatchById);

// Delete a dispatch by ID
router.delete("/delete/:id", deleteDispatchById);

module.exports = router;
