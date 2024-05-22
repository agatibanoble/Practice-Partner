const Country = require("../Models/countryModel");

// Controller for handling country-related operations
// Render the country form for creating a new country
exports.renderNewCountryForm = (req, res) => {
  res.render("country-form", { title: "Create New Country" });
};

// Render the country form for editing an existing country
exports.renderEditCountryForm = async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    if (country) {
      res.render("country-form", { title: "Edit Country", country });
    } else {
      res.status(404).json({ message: "Country not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Render the list of countries
exports.renderCountryList = async (req, res) => {
  try {
    const countries = await Country.find();
    res.render("countries/list-countries", {
      title: "List of Countries",
      countries,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Define controller methods
// Get all countries
// exports.getCountries = async (req, res) => {
//   try {
//     // Implement logic to fetch countries from the database
//     const countries = await Country.find()
//       .limit(req.query.limit)
//       .skip((req.query.page - 1) * req.query.limit);
//     res.json({ data: countries });
//   } catch (error) {
//     console.error("Error fetching countries:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
exports.getCountries = async (req, res) => {
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
    console.log(results);
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

// Get country by ID
exports.getCountryById = async (req, res) => {
  try {
    // Implement logic to fetch country by ID from the database
    const country = await Country.findById(req.params.id);
    if (!country) {
      return res.status(404).json({ error: "Country not found" });
    }
    res.json({ data: country });
  } catch (error) {
    console.error("Error fetching country by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// Save country
exports.saveCountry = async (req, res) => {
  try {
    // Implement logic to save country to the database
    const newCountry = new Country(req.body);
    await newCountry.save();
    res.json({
      success: true,
      message: "Country saved successfully",
      country: newCountry,
    });
  } catch (error) {
    console.error("Error saving country:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// Delete country by ID
exports.deleteCountry = async (req, res) => {
  try {
    // Implement logic to delete country by ID from the database
    const country = await Country.findByIdAndDelete(req.params.id);
    if (!country) {
      return res.status(404).json({ error: "Country not found" });
    }
    res.json({ success: true, message: "Country deleted successfully" });
  } catch (error) {
    console.error("Error deleting country:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
