const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const tokens = require("./utils/csrfTokens.js");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
require("dotenv").config();

const usersRoute = require("./routes/user.route.js");
const productsRoute = require("./routes/product.route.js");
const cartRoute = require("./routes/cart.route.js");
const checkoutRoute = require("./routes/checkout.route.js");
const orderRoute = require("./routes/order.model.js");
const adminRoute = require("./routes/admin.route.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET_COOKIE));
app.use(helmet.noSniff());
app.use(helmet.dnsPrefetchControl({ allow: false }));
app.use(helmet.referrerPolicy({ policy: "no-referrer-when-downgrade" }));
app.use(
  helmet.hsts({ maxAge: 63072000, includeSubDomains: true, preload: true })
);
app.use(mongoSanitize());
app.use(xss());
app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
  })
);
app.disable("x-powered-by");

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Route to fetch CSRF secret + token
app.get("/api/csrf-token", (req, res) => {
  const secret = tokens.secretSync();
  const token = tokens.create(secret);
  res.cookie("csrf-secret", secret, {
    httpOnly: true,
    sameSite: process.env.PRODUCTION === "true" ? "none" : "lax",
    secure: process.env.PRODUCTION === "true",
  });
  res.json({ csrfToken: token });
});

//Routes
app.use("/api/users", usersRoute);
app.use("/api/products", productsRoute);
app.use("/api/cart", cartRoute);
app.use("/api/checkout", checkoutRoute);
app.use("/api/orders/", orderRoute);
app.use("/api/admin/", adminRoute);

// Middleware for handling errors
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Handle Mongoose validation errors (status 400)
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: err.message,
    });
  }

  // Handle duplicate key errors (status 409)
  if (err.code === 11000) {
    return res.status(409).json({
      message: "Duplicate key error (e.g., email already exists)",
    });
  }

  // Default to 500 if no status is set
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
// app.listen(PORT);
