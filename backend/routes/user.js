const express = require("express");
const { body } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const validate = require("../middleware/validate");

const routerUser = express.Router();

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
  validate,   
  async (req, res) => {
    try {
      const { username, email, password } = req.body;

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
        password: hashedPassword,
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
 * Login Route
 */
routerUser.post(
  "/login",
  [
    body("email").optional().isEmail().withMessage("Invalid email format"),
    body("username").optional().notEmpty().withMessage("Username is required if email is not provided"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validate,   
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

      // Create JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );
      console.log("Token: ", token)

      res.status(200).json({
        status: true,
        message: "Login successful",
        token,   // ⬅️ Return token to frontend
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
