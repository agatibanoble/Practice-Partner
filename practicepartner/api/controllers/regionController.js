const Region = require("../models/regionModel");

// Get all regions
const getAllRegions = function (req, res) {
  // Retrieve all regions from the database
  Region.find()
    .populate({
      path: "country",
      model: "Country",
      options: { strictPopulate: false },
    })
    .then((regions) => {
      // Send a success response with the list of regions
      const successResponse = {
        success: true,
        message: "Regions retrieved successfully",
        data: regions,
        error: null,
      };
      res.status(200).json(successResponse);
    })
    .catch((error) => {
      // Send an error response if an error occurs while fetching regions
      const errorResponse = {
        success: false,
        message: "There was an error retrieving regions",
        data: null,
        error: error.message,
      };
      res.status(500).json(errorResponse);
    });
};
// Controller function to get regions by country ID
async function getRegionsByCountry(req, res) {
  // const { countryId } = req.params.countryId;
  const countryId = req.params.countryId;
  console.log(countryId);
  if (!countryId) {
    return res.status(400).json({ error: "Country ID is required" });
  }

  try {
    const regions = await Region.find().populate({
      path: "country",
      model: "Country",
      options: { strictPopulate: false },
    });
    console.log("Regions found:", regions);
    if (!regions.length) {
      return res
        .status(404)
        .json({ message: "No regions found for this country" });
    }
    const successResponse = {
      success: true,
      message: "Regions retrieved successfully",
      data: regions,
      error: null,
    };
    res.status(200).json(successResponse);
    //return successResponse; //res.status(200).json(regions);
  } catch (error) {
    console.error("Error fetching regions:", error);
    const errorResponse = {
      success: false,
      message: "Error retrieving cases",
      data: null,
      error: error.message,
    };
    res.status(500).json(errorResponse);
    // return res.status(500).json({ error: "Internal server error" });
  }
}
// Get a region by ID
const getRegionById = function (req, res) {
  // Find a region by ID
  Region.findById(req.params.id)
    .populate({
      path: "country",
      model: "Country",
      options: { strictPopulate: false },
    })
    .then((region) => {
      // Check if the region exists
      if (!region) {
        const errorResponse = {
          success: false,
          message: "Region not found",
          data: null,
          error: "Region not found",
        };
        return res.status(404).json(errorResponse);
      }
      // Send a success response with the region details
      const successResponse = {
        success: true,
        message: "Region retrieved successfully",
        data: region,
        error: null,
      };
      res.status(200).json(successResponse);
    })
    .catch((error) => {
      // Send an error response if an error occurs while fetching the region
      const errorResponse = {
        success: false,
        message: "There was an error retrieving region",
        data: null,
        error: error.message,
      };
      res.status(500).json(errorResponse);
    });
};

// Create a new region
const createRegion = function (req, res) {
  // Create a new region instance using the request body
  const region = new Region(req.body);

  // Save the region to the database
  region
    .save()
    .then((region) => {
      // If the region is successfully saved, send a success response
      const successResponse = {
        success: true,
        message: "Region created successfully",
        data: region,
        error: null,
      };
      res.json(successResponse);
    })
    .catch((error) => {
      // If an error occurs during region creation or saving, handle it here
      console.error("Error creating region:", error);

      // Send an error response
      const errorResponse = {
        success: false,
        message: "Failed to create region",
        data: null,
        error: error.message,
      };
      res.status(500).json(errorResponse);
    });
};

// Update an existing region
const updateRegionById = function (req, res) {
  // Find and update the region by ID
  Region.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((region) => {
      // Check if the region exists
      if (!region) {
        const errorResponse = {
          success: false,
          message: "Region not found",
          data: null,
          error: "Region not found",
        };
        return res.status(404).json(errorResponse);
      }
      // Send a success response if the region is updated successfully
      const successResponse = {
        success: true,
        message: "Region updated successfully",
        data: region,
        error: null,
      };
      res.json(successResponse);
    })
    .catch((error) => {
      console.error("Error updating region:", error);
      // Send an error response if an error occurs during region update
      const errorResponse = {
        success: false,
        message: "Failed to update region",
        data: null,
        error: "Failed to update region",
      };
      res.status(500).json(errorResponse);
    });
};

// Delete a region by ID
const deleteRegionById = function (req, res) {
  // Find and delete the region by ID
  Region.findByIdAndDelete(req.params.id)
    .then((region) => {
      // Check if the region exists
      if (!region) {
        const errorResponse = {
          success: false,
          message: "Region not found",
          data: null,
          error: "Region not found",
        };
        return res.status(404).json(errorResponse);
      }
      // Send a success response if the region is deleted successfully
      const successResponse = {
        success: true,
        message: "Region deleted successfully",
        data: region,
        error: null,
      };
      res.status(200).json(successResponse);
    })
    .catch((error) => {
      // Send an error response if an error occurs while deleting the region
      const errorResponse = {
        success: false,
        message: "There was an error deleting region",
        data: null,
        error: error.message,
      };
      res.status(500).json(errorResponse);
    });
};

// Export all functions
module.exports = {
  createRegion,
  updateRegionById,
  getAllRegions,
  getRegionById,
  deleteRegionById,
  getRegionsByCountry,
};
