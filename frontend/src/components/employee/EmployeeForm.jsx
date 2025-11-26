import React, { useState, useEffect } from "react";
import api from "../../api/axios";

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
      email,
      position,
      salary,
      department,
      date_of_joining: dateOfJoining,
    };

    try {
      if (mode === "add") {
        await api.post("/employees", payload, { headers: { Authorization: `Bearer ${token}` } });
      } else if (mode === "edit") {
        await api.put(`/employees/${employee._id}`, payload, { headers: { Authorization: `Bearer ${token}` } });
      }
      refresh();
      onClose();
    } catch (err) {
      alert("Failed to save employee");
    }
  };

  return (
    <div style={{ border: "1px solid black", padding: "20px", marginTop: "20px" }}>
      <h3>{mode === "add" ? "Add Employee" : "Update Employee"}</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} required />
        <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} required />
               <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />

        <input type="text" placeholder="Position" value={position} onChange={e => setPosition(e.target.value)} required />
        <input type="number" placeholder="Salary" value={salary} onChange={e => setSalary(e.target.value)} required />
        <input type="text" placeholder="Department" value={department} onChange={e => setDepartment(e.target.value)} required />
        <input type="date" value={dateOfJoining} onChange={e => setDateOfJoining(e.target.value)} />
        <button type="submit">{mode === "add" ? "Add" : "Update"}</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default EmployeeForm;
