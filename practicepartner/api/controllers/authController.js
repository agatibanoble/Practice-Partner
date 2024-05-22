const User = require("../models/userModel");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const dotenv = require("dotenv");
const sendmail = require("../util/email.js");
const catchAsync = require("../util/catchAsync.js");
const config = require("../config/config");
dotenv.config({ path: "./config.env" });

const logout = (req, res) => {
  res.cookie("jwt", "undefined", new Date(Date.now() + 10 * 1000));
  res
    .status(200)
    .json({ status: "success", message: "User logged out successfully" });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    const err = new Error("Please enter email and password");
    err.statusCode = 400;
    return next(err);
  }
  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        const err = new Error("Email or password is incorrect");
        err.statusCode = 401;
        throw err;
      }
      return user
        .correctPassword(password, user.password)
        .then((isCorrect) => ({ user, isCorrect }));
    })
    .then(({ user, isCorrect }) => {
      if (!isCorrect) {
        const err = new Error("Email or password is incorrect");
        err.statusCode = 401;
        throw err;
      }
      const token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: "3d",
      });

      const cookieOptions = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("jwt", token, cookieOptions);

      user.password = undefined;
      res.status(200).json({
        status: "success",
        data: { user },
      });
    })
    .catch(next);
};

const signup = (req, res, next) => {
  console.log(req.body);
  User.create(req.body)
    .then((user) => {
      res.status(201).json({
        status: "success",
        data: user,
      });
    })
    .catch(next);
};

const sendEmail = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        throw new Error("User with this email does not exist");
      }
      const resettoken = crypto.randomBytes(32).toString("hex");
      const sendtoken = `http://127.0.0.1:${process.env.PORT}/resetpassword/${resettoken}`;
      const mailtoken = crypto
        .createHash("sha256")
        .update(resettoken)
        .digest("hex");
      const passwordresettokenexp = Date.now() + 10 * 60 * 1000;
      return sendEmail({ message: sendtoken, toid: req.body.email }).then(
        () => ({ user, mailtoken, passwordresettokenexp })
      );
    })
    .then(({ user, mailtoken, passwordresettokenexp }) => {
      user.passwordtoken = mailtoken;
      user.passwordtokenexp = passwordresettokenexp;
      return user.save({ validateBeforeSave: false });
    })
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Password reset email sent successfully",
      });
    })
    .catch(next);
};

const verifytoken = (req, res, next) => {
  const token = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");
  User.findOne({ passwordtoken: token })
    .then((user) => {
      if (!user) {
        throw new Error("Invalid or expired token");
      }
      res.status(200).json({
        status: "success",
        message: "Token verified successfully",
      });
    })
    .catch(next);
};

const resetpassword = (req, res, next) => {
  const token = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");
  User.findOne({ passwordtoken: token })
    .then((user) => {
      if (!user) {
        throw new Error("Invalid or expired token");
      }
      user.passwordtoken = undefined;
      user.passwordresettokenexp = "00000";
      user.password = req.body.password;
      user.confirm_password = req.body.confirm_password;
      return user.save();
    })
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Password reset successfully",
      });
    })
    .catch(next);
};

const islogin = (req, res, next) => {
  if (!req.cookies.jwt) {
    return res
      .status(401)
      .json({ status: "fail", message: "User not logged in" });
  }
  const token = req.cookies.jwt;
  promisify(jwt.verify)(token, "this-is-my-token")
    .then((decoded) => User.findById(decoded.id))
    .then((crtuser) => {
      if (!crtuser) {
        return res
          .status(401)
          .json({ status: "fail", message: "User not logged in" });
      }
      req.user = crtuser;
      res.locals.user = crtuser;
      res.status(200).json({
        status: "success",
        data: { user: crtuser },
      });
    })
    .catch(() =>
      res.status(401).json({ status: "fail", message: "User not logged in" })
    );
};

module.exports = {
  logout,
  login,
  signup,
  sendmail,
  verifytoken,
  resetpassword,
  islogin,
};
