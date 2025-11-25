const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user");

const routerUser = express.Router();

/**
 * Middleware to handle validation results
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: false, errors: errors.array() });
  }
  next();
};

/**
 *  Signup Route
 */
routerUser.post(
  "/signup",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email")
      .notEmpty().withMessage("Email is required")
      .isEmail().withMessage("Invalid email format"),
    body("password")
      .notEmpty().withMessage("Password is required")
      .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { username, email, password} = req.body;

      // Check if email already exists
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ status: false, message: "Email already registered" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword
      });

      await newUser.save();

      res.status(201).json({ status: true, message: "User registered successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, message: "Server error" });
    }
  }
);

/**
 * ✅ Login Route
 */
routerUser.post(
  "/login",
  [
    body("email")
      .optional()
      .isEmail().withMessage("Invalid email format"),
    body("username")
      .optional()
      .notEmpty().withMessage("Username is required if email is not provided"),
    body("password")
      .notEmpty().withMessage("Password is required"),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Find user by email or username
      const user = await UserModel.findOne({
        $or: [{ email }, { username }],
      });

      if (!user) {
        return res.status(400).json({ status: false, message: "User not found" });
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ status: false, message: "Invalid password" });
      }

      res.status(200).json({
        status: true,
        message: "Login successful",
        user: {
          username: user.username,
          email: user.email,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, message: "Server error" });
    }
  }
);


module.exports = routerUser;
