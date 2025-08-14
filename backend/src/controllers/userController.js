const User = require("../models/user.model.js");
const asyncHandler = require("../utils/asyncHandler.js");
const { sendforgotPasswordEmail } = require("../email/resendEmails.js");
const crypto = require("crypto");

let userController = {};

userController.postSignup = asyncHandler(async (req, res) => {
  const { name, email, googleId = null, password } = req.body;
  let user;

  if (googleId) {
    // Prevent using same Google ID for multiple accounts
    const existingGoogleUser = await User.findOne({ googleId });
    if (existingGoogleUser) {
      return res.status(400).json({
        message: "This Google account is already linked with another user.",
      });
    }

    // If email exists, just link Google ID to that account
    user = await User.findOne({ email });

    if (user) {
      user.googleId = googleId;
    } else {
      // Create new user with Google ID
      user = new User({ name, email, googleId, password });
    }
  } else {
    // Normal signup
    user = new User({ name, email, password });
  }

  await user.save();

  const token = await user.generateAuthToken();

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    secure: process.env.PRODUCTION === "true",
    signed: true,
    sameSite: process.env.PRODUCTION === "true" ? "none" : "lax",
  });

  return res.status(201).json({ user });
});

userController.postLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "double check your email" });
  }
  const matched = await user.matchPassword(password);
  if (!matched) {
    return res.status(400).json({ message: "Wrong Password" });
  }
  const token = await user.generateAuthToken();
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    secure: process.env.PRODUCTION === "true" ? true : false,
    sameSite: process.env.PRODUCTION === "true" ? "none" : "lax",
    signed: true,
  });
  res.status(200).json({ user });
});

userController.getProfile = asyncHandler(async (req, res) => {
  return res.status(200).json({ user: req.user });
});

userController.deleteLogout = asyncHandler(async (req, res) => {
  const userToken = req.signedCookies.jwt;
  req.user.tokens = req.user.tokens.filter((t) => userToken !== t.token);
  await req.user.save();
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.PRODUCTION === "true" ? true : false,
    sameSite: process.env.PRODUCTION === "true" ? "none" : "lax",
    signed: true,
  });
  res.status(200).json({ message: "logged out" });
});

userController.PostForgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(404)
      .json({ message: "User not found ensure your email have an account" });
  }

  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = Date.now() + 1000 * 60 * 10; // 10 minutes
  await user.save();
  const resetUrl = `https://frontapp/reset-password?token=${rawToken}`;
  await sendforgotPasswordEmail({ url: resetUrl, to: email });
  res.status(200).json({ message: "check your email" });
});

userController.resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) {
    return res.status(400).json({ message: "ExpiredToken" });
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  user.tokens = [];

  await user.save();

  return res.status(200).json({ message: "password reseted succefully" });
});

module.exports = userController;
