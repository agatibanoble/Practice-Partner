const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/userController");
const verifyToken = require("../middleware/authMiddleware");
// const auth = require("../controllers/authController");
// Routes
router.post("/createUser", createUser);
router.get("/getUsers", verifyToken, getUsers);
router.get("/getUserById/:id", getUserById);
router.put("/updateUserById/:id", updateUserById);
router.delete("/deleteUserById/:id", deleteUserById);

// Export router
module.exports = router;
