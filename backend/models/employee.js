const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100,
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  position: {
    type: String,
    required: true,
    trim: true,
  },
  salary: {
    type: Number,
    required: true,
    min: 0,
  },
  date_of_joining: {
    type: Date,
    required: true,
  },
  department: {
    type: String,
    trim: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
  },
    profile_picture: { type: String , required: false}, 
});

// 🔄 Automatically update "updated_at" before saving
employeeSchema.pre("save", function (next) {
  this.updated_at = new Date();
  next();
});



module.exports = mongoose.model("Employee", employeeSchema);
