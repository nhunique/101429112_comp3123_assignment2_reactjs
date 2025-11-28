import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";

function EmployeeForm({ mode, employee, onClose, refresh }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [department, setDepartment] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

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

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("position", position);
    formData.append("salary", salary ? Number(salary) : 0);
    formData.append("department", department);
    if (dateOfJoining) {
      formData.append(
        "date_of_joining",
        new Date(dateOfJoining).toISOString().split("T")[0]
      );
    }
    if (profilePicture) {
      formData.append("profile_picture", profilePicture);
    }

    try {
      if (mode === "add") {
        await api.post("/employees", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      } else if (mode === "edit") {
        await api.put(`/employees/${employee._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      refresh();
      onClose();
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message); 
      } else {
        alert("Unexpected error occurred.");
      }
      console.error(error);
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
            <div className="mb-3">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfilePicture(e.target.files[0])}
              />
            </div>

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
