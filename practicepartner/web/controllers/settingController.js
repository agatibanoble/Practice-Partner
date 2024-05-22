// Function to render the list of clients
const renderIndex = function (req, res) {
  res.render("settings/index", {
    title: "Settings Dashboard",
    folder: "Settings",
  });
};

// Export all functions
module.exports = {
  renderIndex,
};
