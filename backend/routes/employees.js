const express = require("express");
const { body, param, query, validationResult } = require("express-validator");
const EmployeeModel = require("../models/employee");

const routerEmployee = express.Router();

/**
 * Helper middleware to handle validation results
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: false, errors: errors.array() });
  }
  next();
};

/**
 * GET /api/v1/emp/employees
 * List all employees
 */
routerEmployee.get("/employees", async (req, res) => {
  try {
    const employees = await EmployeeModel.find();
    res.status(200).json({ status: true, employees });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Server Error" });
  }
});

/**
 * POST /api/v1/emp/employees
 * Create a new employee
 */
routerEmployee.post(
  "/employees",
  [
    body("first_name").notEmpty().withMessage("First name is required"),
    body("last_name").notEmpty().withMessage("Last name is required"),
    body("position").notEmpty().withMessage("Position is required"),
    body("salary")
      .notEmpty().withMessage("Salary is required")
      .isNumeric().withMessage("Salary must be numeric"),
    body("date_of_joining")
      .optional()
      .isDate().withMessage("Invalid date format (expected YYYY-MM-DD)"),
    body("department")
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { first_name, last_name, position, salary, date_of_joining, department } = req.body;

      const newEmployee = new EmployeeModel({
        first_name,
        last_name,
        position,
        salary,
        date_of_joining,
        department
      });

      await newEmployee.save();

      res.status(201).json({
        status: true,
        message: "Employee created successfully",
        employee: newEmployee,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, message: "Server Error" });
    }
  }
);

/**
 * GET /api/v1/emp/employees/:eid
 * Get an employee by ID
 */
routerEmployee.get(
  "/employees/:eid",
  [
    param("eid").isMongoId().withMessage("Invalid Employee ID"),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const employee = await EmployeeModel.findById(req.params.eid);
      if (!employee) {
        return res.status(404).json({ status: false, message: "Employee not found" });
      }

      res.status(200).json({ status: true, employee });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, message: "Server Error" });
    }
  }
);

/**
 * PUT /api/v1/emp/employees/:eid
 * Update an employee by ID
 */
routerEmployee.put(
  "/employees/:eid",
  [
    param("eid").isMongoId().withMessage("Invalid Employee ID"),
    body("first_name").optional(),
    body("last_name").optional(),
    body("position").optional(),
    body("salary").optional().isNumeric().withMessage("Salary must be numeric"),
    body("date_of_joining").optional().isDate().withMessage("Invalid date format (expected YYYY-MM-DD)"),
    body("department").optional()
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const employee = await EmployeeModel.findByIdAndUpdate(
        req.params.eid,
        req.body,
        { new: true }
      );

      if (!employee) {
        return res.status(404).json({ status: false, message: "Employee not found" });
      }

      res.status(200).json({
        status: true,
        message: "Employee updated successfully",
        employee,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, message: "Server Error" });
    }
  }
);

/**
 * DELETE /api/v1/emp/employees?eid=xxx
 * Delete employee by query param
 */
routerEmployee.delete(
  "/employees",
  [
    query("eid").isMongoId().withMessage("Invalid Employee ID in query"),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { eid } = req.query;

      const employee = await EmployeeModel.findByIdAndDelete(eid);
      if (!employee) {
        return res.status(404).json({ status: false, message: "Employee not found" });
      }

      res.status(204).send(); // No content on success
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, message: "Server Error" });
    }
  }
);

module.exports = routerEmployee;
