// Function to render the list of visits
const renderVisitListPage = function (req, res) {
  res.render("visits/list-visit-page", {
    title: "List of Visits",
    folder: "Visits",
  });
};

// Function to render the new visit form
const renderCreateVisitPage = function (req, res) {
  res.render("visits/list-visit-page", {
    title: "Create Visit",
    folder: "Visits",
  });
};

// Function to render the edit visit form
const renderEditVisitPage = function (req, res) {
  res.render("visits/visit-form", {
    title: "Edit Visit",
    folder: "Visits",
  }); // Placeholder for visit data
};

// Export all functions
module.exports = {
  renderVisitListPage,
  renderCreateVisitPage,
  renderEditVisitPage,
};
