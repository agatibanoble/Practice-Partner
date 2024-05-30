// Function to render the list of employees
const renderEmployeeListPage = function (req, res) {
  res.render("employees/list-employee-page", {
    title: "List of Employee",
    folder: "Employee",
  });
};


// Export all functions
module.exports = {
  renderEmployeeListPage,
};
