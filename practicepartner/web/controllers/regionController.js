// Render the list of regions
exports.renderRegions = async (req, res) => {
  try {
    // Render the view with regions and countries
    res.render("region-views/region-list-page", {
      title: "List of Regions",
      regions,
      countries,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
