// Import necessary modules
const express = require("express");
const router = express.Router();
const regionController = require("../controllers/regionController");

// Route to get  regions with pagination and search
router.get("/getRegions", regionController.getRegions);

// Route to get all regions
router.get("/getAllRegions", regionController.getAllRegions);

// Route to get a region by ID
router.get("/getRegionById/:id", regionController.getRegionById);

// Route to create a new region
// router.post("/createRegion", regionController.createRegion);
router.post("/saveRegion/", regionController.saveRegion);
// Route to update a region by ID
// router.put("/updateRegion/:id", regionController.updateRegion);

// Route to delete a region by ID
router.delete("/deleteRegion/:id", regionController.deleteRegion);

// Route to render the region form for creating a new region
router.get("/addRegion", regionController.renderNewRegionForm);

// Route to render the region form for editing an existing region
router.get("/editRegion/:id", regionController.renderEditRegionForm);
// Route to render the region form for editing an existing region
router.get("/listRegions/", regionController.renderRegionList);

router.get("/getData/", regionController.getData);
module.exports = router;
