// Function to render the list of employees
const renderEmployeeListPage = function (req, res) {
  res.render("employee-views/employee-list-page", {
    title: "List of Employee",
    folder: "Employee",
  });
};

// Export all functions
module.exports = {
  renderEmployeeListPage,
};
