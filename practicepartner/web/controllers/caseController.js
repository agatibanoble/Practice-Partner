// Function to render the list of clients
const renderCaseListPage = function (req, res) {
  res.render("case-views/case-list-page", {
    title: "List of Cases",
    folder: "Cases",
  });
};

// Function to render the new client form
const renderCaseManagementPage = function (req, res) {
  res.render("case-views/case-management-page", {
    title: "Manage Case",
    folder: "Cases",
  });
};

// Export all functions
module.exports = {
  renderCaseListPage,
  renderCaseManagementPage,
};
