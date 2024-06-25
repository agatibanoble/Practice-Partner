// Import required modules
const express = require("express");
const router = express.Router();
const {
  createDeliveryType,
  getAllDeliveryTypes,
  getDeliveryTypeById,
  updateDeliveryTypeById,
  deleteDeliveryTypeById,
} = require("../controllers/deliveryTypeController");

// Define routes for case categories
router.post("/create", createDeliveryType); // Create a new case category
router.get("/get", getAllDeliveryTypes); // Get all case categories
router.get("/get/:id", getDeliveryTypeById); // Get a case category by ID
router.post("/update/:id", updateDeliveryTypeById); // Update a case category by ID
router.delete("/delete/:id", deleteDeliveryTypeById); // Delete a case category by ID

// Export the router
module.exports = router;
