import React, { useState, useEffect } from "react";
import api from "../../api/axios";
 import 'bootstrap/dist/css/bootstrap.min.css';

function EmployeeForm({ mode, employee, onClose, refresh }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [department, setDepartment] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (mode === "edit" && employee) {
      setFirstName(employee.first_name);
      setLastName(employee.last_name);
      setEmail(employee.email);
      setPosition(employee.position);
      setSalary(employee.salary);
      setDepartment(employee.department);
      setDateOfJoining(employee.date_of_joining?.split("T")[0] || "");
    }
  }, [employee, mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      position,
       salary: salary ? Number(salary) : 0,
      department,
      date_of_joining: dateOfJoining
        ? new Date(dateOfJoining).toISOString().split("T")[0]
        : null,
    };

    try {
      if (mode === "add") {
        await api.post("/employees", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("POST payload:", payload);
      } else if (mode === "edit") {
        await api.put(`/employees/${employee._id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      refresh();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to save employee");
    }
  };

return (
   <div className="card p-4 mt-4 shadow-sm">
      <h3 className="fw-bold mb-3">
        {mode === "add" ? "Add Employee" : "Update Employee"}
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="form-control"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="form-control"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            id="position"
            name="position"
            className="form-control"
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="number"
            id="salary"
            name="salary"
            className="form-control"
            placeholder="Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            id="department"
            name="department"
            className="form-control"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="date"
            id="dateOfJoining"
            name="dateOfJoining"
            className="form-control"
            value={dateOfJoining}
            onChange={(e) => setDateOfJoining(e.target.value)}
          />
        </div>

        <div className="d-flex gap-2 mt-3">
          <button type="submit" className="btn btn-primary">
            {mode === "add" ? "Add" : "Update"}
          </button>

          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeForm;
