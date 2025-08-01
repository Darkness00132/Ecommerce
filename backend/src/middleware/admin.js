function admin(req, res, next) {
  if (
    req.user.role === "admin" ||
    req.user.role === "superAdmin" ||
    req.user.role === "owner"
  ) {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as admin or superAdmin" });
  }
}

function superAdmin(req, res, next) {
  if (req.user.role === "superAdmin" || req.user.role === "owner") {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as superAdmin" });
  }
}

module.exports = { admin, superAdmin };
