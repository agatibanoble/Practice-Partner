const Region = require("../Models/regionModel");
const Country = require("../Models/countryModel");

// Controller for handling region-related operations
// Render the region form for creating a new region
exports.renderNewRegionForm = (req, res) => {
  res.render("region-form", { title: "Create New Region" });
};

// Render the region form for editing an existing region
exports.renderEditRegionForm = async (req, res) => {
  try {
    const region = await Region.findById(req.params.id);
    if (region) {
      res.render("region-form", { title: "Edit Region", region });
    } else {
      res.status(404).json({ message: "Region not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Render the list of regions
exports.renderRegionList = async (req, res) => {
  try {
    // Fetch regions with populated countries
    const regions = await Region.find().populate("country").exec();

    // Fetch countries separately (if needed)
    const countries = await Country.find();

    // Render the view with regions and countries
    res.render("regions/list-regions", {
      title: "List of Regions",
      regions,
      countries,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// getRegions with pagination and search
exports.getRegions = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const searchTerm = req.query.searchTerm || "";

  const startIndex = (page - 1) * limit;
  // const endIndex = page * limit;

  const regex = new RegExp(searchTerm, "i");
  const query = {
    $or: [{ regionName: regex }],
  };

  try {
    const results = await Region.find(query)
      .populate({
        path: "country",
        options: {
          retainNullValues: true, // Populate even if the field is empty
        },
      })
      .limit(limit)
      .skip(startIndex)
      .exec();
    const totalCount = await Region.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);
    console.log(results);
    const pagination = {
      currentPage: page,
      totalPages: totalPages,
    };

    res.status(200).json({
      success: true,
      count: results.length,
      pagination: pagination,
      data: results,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all regions
exports.getAllRegions = async (req, res) => {
  try {
    const regions = await Region.find();
    res.status(200).json(regions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get region by ID
exports.getRegionById = async (req, res) => {
  try {
    const region = await Region.findById(req.params.id);
    if (region) {
      res.status(200).json(region);
    } else {
      res.status(404).json({ message: "Region not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new region
exports.createRegion = async (req, res) => {
  // If the client is successfully saved, send a success response
  try {
    const region = new Region(req.body);

    // region.country = reg.body.country;
    await region.save();
    const successResponse = {
      success: true,
      message: "Region created successfully",
      region: region, // Optionally, include the created client in the response
    };
    res.json(successResponse);
  } catch (error) {
    res.status(400).json({ message: error.message });
    // If an error occurs during client creation or saving, handle it here
    console.error("Error creating Region:", error);

    // Send an error response
    const errorResponse = {
      success: false,
      error: "Failed to create client",
    };
    res.status(500).json(errorResponse);
  }
};

// Update a region
exports.updateRegion = async (req, res) => {
  try {
    const region = await Region.findById(req.params.id);
    if (region) {
      region.name = req.body.name || region.name;
      region.country = req.body.country || region.country;

      const updatedRegion = await region.save();
      res.status(200).json(updatedRegion);
    } else {
      res.status(404).json({ message: "Region not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a region
exports.deleteRegion = async (req, res) => {
  try {
    const region = await Region.findById(req.params.id);
    console.log(region);
    if (region) {
      await region.remove();
      res.status(200).json({ message: "Region deleted" });
    } else {
      res.status(404).json({ message: "Region not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.saveRegion = async (req, res) => {
  try {
    let region;

    if (req.body._id) {
      // If ID is provided, update the region
      region = await Region.findById(req.body._id);
      if (!region) {
        return res.status(404).json({ message: "Region not found" });
      }

      region.regionName = req.body.regionName || region.regionName;
      region.country = req.body.country || region.country;
    } else {
      // If ID is not provided, create a new region
      delete req.body._id;
      region = new Region(req.body);
    }
    const successResponse = {
      success: true,
      message: req.body._id
        ? "Region updated successfully"
        : "Region created successfully",
      region: region, // Optionally, include the created client in the response
    };

    //save record
    await region.save();

    res.status(200).json(successResponse);
  } catch (error) {
    // Send an error response
    const errorResponse = {
      success: false,
      error: "There was an error",
      message: error.message,
    };
    res.status(400).json(errorResponse);
  }
};

// Controller function to handle pagination logic
exports.getData = (req, res) => {
  try {
    console.log("started here");
    const page = parseInt(req.query.page) || 1; // Current page, default to 1
    const limit = parseInt(req.query.limit) || 10; // Items per page, default to 10

    // Validate pagination parameters
    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
      return res.status(400).json({ error: "Invalid pagination parameters" });
    }

    // Calculate skip value based on page and limit
    const skip = (page - 1) * limit;

    // Query your database to fetch data based on pagination parameters
    Region.find()
      .skip(skip)
      .limit(limit)
      .exec((err, data) => {
        if (err) {
          // Handle database query error
          console.error("Database error:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        // Return fetched data
        res.json(data);
      });
  } catch (error) {
    // Handle unexpected errors
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Unexpected error occurred" });
  }
};
