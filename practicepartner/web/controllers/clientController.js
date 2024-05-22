// Function to render the list of clients
const renderClientListPage = function (req, res) {
  res.render("clients/list-client-page", {
    title: "List of Clients",
    folder: "Clients",
  });
};

// Function to render the new client form
const renderClientManagementPage = function (req, res) {
  res.render("clients/client-management-page", {
    title: "Manage Client",
    folder: "Clients",
  });
};

// Function to render the edit client form
const renderEditClientPage = function (req, res) {
  res.render("clients/client-form", {
    title: "Edit Client",
    folder: "Clients",
  }); // Placeholder for client data
};

// Export all functions
module.exports = {
  renderClientListPage,
  renderClientManagementPage,
  renderEditClientPage,
};
