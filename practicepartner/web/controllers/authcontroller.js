const User = require("../models/userModel.js");
const crypto = require("crypto");
const catchAsync = require("../util/catchAsync.js");
const sendmail = require("../util/email.js");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

exports.logout = catchAsync(async (req, res) => {
  res.cookie("jwt", "undefined", new Date(Date.now() + 10 * 1000));
  res.status(200).redirect("/login");
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const err = new Error("please enter email or password", 400);
    return next(err);
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    const err = new Error(
      "email id is not valid or user in no longer ACTIVE!!!!"
    );
    err.status = "fail";
    err.statusCode = 401;
    return next(err);
  }
  if (!(await user.correctPassword(password, user.password)) || !user) {
    const err = new Error("invalid Id or password");
    err.statusCode = 401;
    return next(err);
  }
  const token = jwt.sign({ id: user._id }, "this-is-my-token", {
    expiresIn: "90d",
  });

  const cookieOptions = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res.cookie("jwt", token, cookieOptions);

  user.password = "undefined";
  res.status(200).json({
    status: "success",
    data: { user },
  });
});

exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.sendmail = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new Error("can not find user with this email"));
  }
  const resettoken = crypto.randomBytes(32).toString("hex");
  const sendtoken =
    `http://127.0.0.1:` + process.env.PORT + `/resetpassword/` + resettoken;
  const mailtoken = crypto
    .createHash("sha256")
    .update(resettoken)
    .digest("hex");
  const passwordresettokenexp = Date.now() + 10 * 60 * 1000;
  await sendmail({ message: sendtoken, toid: req.body.email });
  user.passwordtoken = mailtoken;
  user.passwordtokenexp = passwordresettokenexp;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    sendtoken,
  });
});

exports.verifytoken = catchAsync(async (req, res, next) => {
  const token = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");
  const user = await User.findOne({ passwordtoken: token });
  if (!user) {
    return next(new Error("token is invalida or expired"));
    // res.status(200).redirect('forgotpassword');
  }
  next();
});

exports.resetpassword = catchAsync(async (req, res, next) => {
  const token = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");
  const user = await User.findOne({ passwordtoken: token });
  if (!user) {
    return next(new Error("token is invalida or expired"));
    // res.status(200).redirect('forgotpassword');
  }
  user.passwordtoken = "undefined";
  user.passwordresettokenexp = "00000";
  user.password = req.body.password;
  user.confirm_password = req.body.confirm_password;
  await user.save();
  res.status(200).json({
    status: "success",
  });
});

exports.islogin = catchAsync(async (req, res, next) => {
  try {
    if (!req.cookies.jwt) {
      return res.status(200).redirect("/login");
    }
    const token = req.cookies.jwt;
    const decoded = await promisify(jwt.verify)(token, "this-is-my-token");
    const crtuser = await User.findById(decoded.id);
    if (!crtuser) {
      return res.status(200).redirect("/login");
    }
    req.user = crtuser;
    res.locals.user = crtuser;
    next();
  } catch (err) {
    return res.status(200).redirect("/login");
  }
});
