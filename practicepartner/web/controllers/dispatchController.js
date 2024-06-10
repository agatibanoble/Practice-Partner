// Function to render the list of employees
const renderDispatchListPage = function (req, res) {
  res.render("dispatch-views/dispatch-list-page", {
    title: "List of Dispatch",
    folder: "Dispatch",
  });
};

// Export all functions
module.exports = {
  renderDispatchListPage,
};
