const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/user.model.js");
let adminController = {};

adminController.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json({ users });
});

adminController.makeUser = asyncHandler(async (req, res) => {
  const { name, email, password, role = "admin" } = req.body;

  if (role === "superAdmin" && req.user.role !== "owner") {
    return res
      .status(403)
      .json({ message: "Only owner can create superAdmins" });
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });
  res.status(200).json({ user });
});

adminController.updateUser = asyncHandler(async (req, res) => {
  const { name, email, role } = req.body;

  const userToUpdate = await User.findById(req.params.id);

  if (!userToUpdate) {
    return res.status(404).json({ message: "User not found" });
  }

  if (role === "superAdmin" && req.user.role !== "owner") {
    return res
      .status(403)
      .json({ message: "Only owner can assign superAdmin role" });
  }

  // Prevent superAdmin from updating other superAdmins
  if (
    req.user.role === "superAdmin" &&
    userToUpdate.role === "superAdmin" &&
    req.user.id !== userToUpdate.id &&
    req.user.role !== "owner"
  ) {
    return res
      .status(403)
      .json({ message: "You cannot update other superAdmins" });
  }

  // Proceed with update
  userToUpdate.name = name || userToUpdate.name;
  userToUpdate.email = email || userToUpdate.email;
  if (role) userToUpdate.role = role; // Only update role if provided

  await userToUpdate.save();

  res.status(200).json({ user: userToUpdate });
});

adminController.deleteUser = asyncHandler(async (req, res) => {
  const userToDelete = await User.findById(req.params.id);

  if (userToDelete.role === "owner") {
    return res
      .status(403)
      .json({ message: "You cannot delete the owner account" });
  }

  if (!userToDelete) {
    return res.status(404).json({ message: "User not found" });
  }

  // Prevent deleting own account
  if (req.user.id === req.params.id) {
    return res
      .status(400)
      .json({ message: "You cannot delete your own account" });
  }

  // Prevent superAdmin from deleting other superAdmins
  if (
    req.user.role === "superAdmin" &&
    userToDelete.role === "superAdmin" &&
    req.user.id !== userToDelete.id &&
    req.user.role !== "owner"
  ) {
    return res
      .status(403)
      .json({ message: "You cannot delete other superAdmins" });
  }

  await userToDelete.deleteOne();

  res.status(200).json({ message: "Deleted user successfully" });
});

module.exports = adminController;
