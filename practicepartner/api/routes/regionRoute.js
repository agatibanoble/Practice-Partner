// regionRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllRegions,
  getRegionById,
  createRegion,
  updateRegionById,
  deleteRegionById,
  getRegionsByCountry,
} = require("../controllers/regionController");

// Routes for handling region operations
router.get("/getRegions", getAllRegions);
router.get("/getRegion/:id", getRegionById);
router.get("/country/:countryId/regions", getRegionsByCountry);
router.post("/createRegion", createRegion);
router.post("/updateRegion/:id", updateRegionById);
router.delete("/deleteRegion/:id", deleteRegionById);

module.exports = router;
