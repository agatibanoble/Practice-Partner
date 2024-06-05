// Function to render the list of employees
const renderComplaintListPage = function (req, res) {
  res.render("complaint-views/complaint-list-page", {
    title: "List of Complaints",
    folder: "Complaint",
  });
};

// Export all functions
module.exports = {
  renderComplaintListPage,
};
