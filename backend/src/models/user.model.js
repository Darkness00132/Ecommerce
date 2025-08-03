const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isEmail, isStrongPassword } = require("validator");

const userSchema = new mongoose.Schema(
  {
    googleId: { type: String, unique: true },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
      validate(value) {
        return /^[A-Za-z\s]+$/.test(value);
      },
      message: "Name must contain only letters and spaces.",
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      validate(value) {
        return isEmail(value);
      },
      message: "Invalid email format",
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        return isStrongPassword(value, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        });
      },
      message:
        "Password must be at least 8 characters and include uppercase, lowercase, number, and symbol",
    },
    role: {
      type: String,
      enum: ["customer", "admin", "superAdmin", "owner"],
      default: "customer",
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
          expires: 60 * 60 * 24 * 30, // 30 days in seconds
        },
      },
    ],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  this.tokens = this.tokens.concat({ token });

  await this.save();

  return token;
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();

  delete user.tokens;
  delete user.password;

  return user;
};

module.exports = mongoose.model("User", userSchema);
