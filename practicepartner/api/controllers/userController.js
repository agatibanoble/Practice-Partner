const User = require("../models/userModel");

// Function to create a new user
const createUser = (req, res) => {
  const userData = req.body;
  User.create(userData)
    .then((newUser) => {
      const successResponse = {
        success: true,
        message: "User created successfully",
        data: newUser,
        error: null,
      };
      res.status(201).json(successResponse);
    })
    .catch((err) => {
      console.error("Error creating user:", err);
      // Send an error response
      const errorResponse = {
        success: false,
        message: "Error creating user",
        data: null,
        error: err.message,
      };
      res.status(500).json(errorResponse);
      // res.status(500).json({ message: "Server error" });
    });
};

// Function to get all users
const getUsers = (req, res) => {
  User.find()
    .select("-password") // Exclude the password field from the query
    .then((users) => {
      // Send a success response with the list of users
      const successResponse = {
        success: true,
        message: "Users retrieved successfully",
        data: users,
        error: null,
      };
      res.status(200).json(successResponse);
    })
    .catch((err) => {
      console.error("Error getting users:", err);
      // Send an error response if an error occurs while fetching users
      const errorResponse = {
        success: false,
        message: "There was an error retrieving users",
        data: null,
        error: err.message,
      };
      res.status(500).json(errorResponse);
    });
};

// Function to get a single user by ID
const getUserById = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .select("-password") // Exclude the password field from the query
    .then((user) => {
      if (!user) {
        const errorResponse = {
          success: false,
          message: "User not found",
          data: null,
          error: "User not found",
        };
        return res.status(404).json(errorResponse);
      }
      // Send a success response with the user details
      const successResponse = {
        success: true,
        message: "User retrieved successfully",
        data: user,
        error: null,
      };
      res.status(200).json(successResponse);
    })
    .catch((err) => {
      console.error("Error getting user by ID:", err);
      // Send an error response if an error occurs while fetching the user
      const errorResponse = {
        success: false,
        message: "There was an error retrieving user",
        data: null,
        error: err.message,
      };
      res.status(500).json(errorResponse);
    });
};

// Function to update a user by ID
const updateUserById = (req, res) => {
  const { id } = req.params;
  let newData = { ...req.body }; // Copy request body to a new object

  // Check if password field is present in the request body
  if (newData.password) {
    // If password field is present, remove it from newData
    delete newData.password;
  }

  User.findByIdAndUpdate(id, newData, { new: true }) // Exclude the password field from the query
    .select("-password") // Exclude the password field from the query
    .then((updatedUser) => {
      if (!updatedUser) {
        const errorResponse = {
          success: false,
          message: "User not found",
          data: null,
          error: "User not found",
        };
        return res.status(404).json(errorResponse);
      }
      // Send a success response if the user is updated successfully
      const successResponse = {
        success: true,
        message: "User updated successfully",
        data: updatedUser,
        error: null,
      };
      res.status(200).json(successResponse);
    })
    .catch((err) => {
      console.error("Error updating user by ID:", err);
      // Send an error response if an error occurs while updating the user
      const errorResponse = {
        success: false,
        message: "There was an error updating user",
        data: null,
        error: err.message,
      };
      res.status(500).json(errorResponse);
    });
};

// Function to delete a user by ID
const deleteUserById = (req, res) => {
  const { id } = req.params;
  User.findByIdAndDelete(id)
    .then((deletedUser) => {
      if (!deletedUser) {
        const errorResponse = {
          success: false,
          message: "User not found",
          data: null,
          error: "User not found",
        };
        return res.status(404).json(errorResponse);
      }
      // Send a success response if the user is deleted successfully
      const successResponse = {
        success: true,
        message: "Client deleted successfully",
        data: deletedUser,
        error: null,
      };
      res.status(200).json(successResponse);
    })
    .catch((err) => {
      console.error("Error deleting user by ID:", err);
      // Send an error response if an error occurs while deleting the user
      const errorResponse = {
        success: false,
        message: "There was an error deleting user",
        data: null,
        error: error.message,
      };
      res.status(500).json(errorResponse);
    });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
