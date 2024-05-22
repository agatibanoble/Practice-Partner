// pageController.js

// Controller function to render the home page
const renderClientCategoryPage = (req, res) => {
  res.render("home", { title: "Home Page" });
};

// Export the controller functions
module.exports = {
  renderClientCategoryPage,
  renderAboutPage,
};
