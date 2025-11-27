const express = require("express");
const { body, param, query } = require("express-validator");
const EmployeeModel = require("../models/employee");
const validate = require("../middleware/validate");
const authenticateJWT = require("../middleware/auth");
const upload = require("../middleware/upload");

const routerEmployee = express.Router();

routerEmployee.get(
  "/employees/search",
  authenticateJWT,
  [
    query("department").optional().isString(),
    query("position").optional().isString(),
  ],
  validate,
  async (req, res) => {
    try {
      const department = req.query.department?.trim();
      const position = req.query.position?.trim();

      const queryObj = {};
      if (department) queryObj.department = { $regex: department, $options: "i" };
      if (position) queryObj.position = { $regex: position, $options: "i" };

      const employees = await EmployeeModel.find(queryObj);

      res.status(200).json({ status: true, employees });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, message: "Server Error" });
    }
  }
);


/**
 * GET /employees
 * List all employees
 */
routerEmployee.get("/employees", authenticateJWT,async (req, res) => {
  try {
    const employees = await EmployeeModel.find();
    res.status(200).json({ status: true, employees });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Server Error" });
  }
});

/**
 * POST /employees
 * Create a new employee
 */
routerEmployee.post(
  "/employees",
  authenticateJWT,
  [
    body("first_name").notEmpty().withMessage("First name is required"),
    body("last_name").notEmpty().withMessage("Last name is required"),
    body("email").notEmpty().withMessage("Email is required"),

    body("position").notEmpty().withMessage("Position is required"),
    body("salary")
      .notEmpty()
      .withMessage("Salary is required")
      .isNumeric()
      .withMessage("Salary must be numeric"),
    body("date_of_joining")
      .optional()
      .isDate()
      .withMessage("Invalid date format (expected YYYY-MM-DD)"),
    body("department").notEmpty().withMessage("Department is required"),
  ],
  validate,
    upload.single("profile_picture"), // Accept single file

  async (req, res) => {
    try {
      const {
        first_name,
        last_name,
        email,
        position,
        salary,
        date_of_joining,
        department,
      } = req.body;

      const newEmployee = new EmployeeModel({
        first_name,
        last_name,
        email,
        position,
        salary,
        date_of_joining,
        department,
                profile_picture: req.file ? req.file.filename : null,

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
 * GET /employees/:eid
 * Get an employee by ID
 */
routerEmployee.get(
  "/employees/:eid",
   authenticateJWT,
  [param("eid").isMongoId().withMessage("Invalid Employee ID")],
  validate,
  async (req, res) => {
    try {
      const employee = await EmployeeModel.findById(req.params.eid);
      if (!employee) {
        return res
          .status(404)
          .json({ status: false, message: "Employee not found" });
      }

      res.status(200).json({ status: true, employee });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, message: "Server Error" });
    }
  }
);

/**
 * PUT /employees/:eid
 * Update an employee by ID
 */
routerEmployee.put(
  "/employees/:eid",
  authenticateJWT,
  upload.single("profile_picture"),

  [
    param("eid").isMongoId().withMessage("Invalid Employee ID"),
    body("email").optional().isEmail().withMessage("Invalid email format"), 

    body("salary").optional().isNumeric().withMessage("Salary must be numeric"),
    body("date_of_joining")
      .optional()
      .isDate()
      .withMessage("Invalid date format (expected YYYY-MM-DD)"),
  ],
  validate,
  async (req, res) => {
    try {
      const employee = await EmployeeModel.findByIdAndUpdate(
        req.params.eid,
        req.body,
        { new: true }
      );
 if (req.file) {
        updateData.profile_picture = req.file.filename;
      }
      if (!employee) {
        return res
          .status(404)
          .json({ status: false, message: "Employee not found" });
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
 * DELETE /emp/employees?eid=xxx
 * Delete employee by query param
 */
routerEmployee.delete(
  "/employees",
  authenticateJWT,

  [query("eid").isMongoId().withMessage("Invalid Employee ID in query")],
  validate,
  async (req, res) => {
    try {
      const { eid } = req.query;

      const employee = await EmployeeModel.findByIdAndDelete(eid);
      if (!employee) {
        return res
          .status(404)
          .json({ status: false, message: "Employee not found" });
      }

      res.status(204).send(); // No content
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, message: "Server Error" });
    }
  }
);



module.exports = routerEmployee;
