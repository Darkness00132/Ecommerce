const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/user.model.js");
let adminController = {};

adminController.getUsers = asyncHandler(async (req, res) => {
  const { search = "" } = req.query;

  let filter = {};
  if (search.trim() !== "") {
    const regex = new RegExp(search, "i");
    filter = {
      $or: [{ name: regex }, { email: regex }],
    };
  }

  const users = await User.find(filter);

  const rolePriority = {
    owner: 1,
    superAdmin: 2,
    admin: 3,
    customer: 4,
  };

  users.sort((a, b) => {
    return rolePriority[a.role] - rolePriority[b.role];
  });

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
  const { name, email, newEmail, role } = req.body;

  const userToUpdate = await User.findOne({ email });

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

  userToUpdate.name = name || userToUpdate.name;
  userToUpdate.email = newEmail || userToUpdate.email;
  if (role) userToUpdate.role = role; // Only update role if provided

  await userToUpdate.save();

  res.status(200).json({ message: "Updated Succefully" });
});

adminController.deleteUser = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const userToDelete = await User.findOne({ email });

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
