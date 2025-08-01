const tokens = require("../utils/csrfTokens");

function verifyCsrf(req, res, next) {
  const secret = req.cookies["CSRF-SECRET"];
  const token = req.headers["x-csrf-token"] || req.body._csrf;
  if (!secret || !token || !tokens.verify(secret, token)) {
    return res.status(403).json({ message: "Invalid CSRF token" });
  }
  next();
}

module.exports = verifyCsrf;
