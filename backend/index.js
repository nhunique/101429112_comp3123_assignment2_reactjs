require("dotenv").config();

const cors = require("cors");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

// Allow CORS
app.use(
  cors({
    origin: "http://localhost:3000", // React app origin
    credentials: true,
  })
);

// Import routes
const userRouter = require("./routes/user");
const empRouter = require("./routes/employees");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Environment variables
const PORT = process.env.PORT || 8081;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

// MongoDB connection
mongoose
  .connect(DB_CONNECTION_STRING)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use(userRouter);
app.use(empRouter);

// Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/home.html"));
});

// Simulated error route
app.get("/error", (req, res, next) => {
  const err = new Error("Something went wrong!");
  next(err); // Pass error to error-handling middleware
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("<h1>Server Error</h1>");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Web Server is listening at port ${PORT}`);
});
