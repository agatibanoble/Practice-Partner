// Function to render the list of employees
const renderEmployeeListPage = function (req, res) {
  res.render("employees/list-employee-page", {
    title: "List of Employee",
    folder: "Employee",
  });
};

// Function to render the new employee form
const renderEmployeeManagementPage = function (req, res) {
  res.render("employees/employee-management-page", {
    title: "Manage Employee",
    folder: "Employee",
  });
};

// Function to render the edit employee form
const renderEditEmployeePage = function (req, res) {
  res.render("employees/employee-form", {
    title: "Edit Employee",
    folder: "Employee",
  }); // Placeholder for employee data
};

// Export all functions
module.exports = {
  renderEmployeeListPage,
  renderEmployeeManagementPage,
  renderEditEmployeePage,
};
