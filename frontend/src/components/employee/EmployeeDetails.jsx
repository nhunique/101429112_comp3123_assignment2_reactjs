import React from "react";

function EmployeeDetails({ employee, onClose }) {
  if (!employee) return null;

  return (
    <div style={{ border: "1px solid gray", padding: "20px", marginTop: "20px" }}>
      <h3>Employee Details</h3>
      <p><b>Name:</b> {employee.first_name} {employee.last_name}</p>
      <p><b>Position:</b> {employee.position}</p>
      <p><b>Salary:</b> {employee.salary}</p>
      <p><b>Department:</b> {employee.department}</p>
      <p><b>Date Joined:</b> {employee.date_of_joining?.split("T")[0]}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default EmployeeDetails;
