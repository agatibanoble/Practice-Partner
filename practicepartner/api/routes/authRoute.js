const express = require("express");
const router = express.Router();
const {
  login,
  logout,
  signup,
  sendmail,
  verifytoken,
  resetpassword,
  islogin,
} = require("../controllers/authController");

router.post("/login", login);
router.get("/logout", logout);
router.post("/signup", signup);
router.post("/forgot-password", sendmail);
router.get("/reset-password/:resettoken", verifytoken);
router.post("/reset-password/:resettoken", resetpassword);
router.get("/islogin", islogin);

module.exports = router;
