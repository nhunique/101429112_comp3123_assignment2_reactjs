import React from "react";
 import 'bootstrap/dist/css/bootstrap.min.css';

function EmployeeDetails({ employee, onClose }) {
  if (!employee) return null;

  return (
    <div className="card mt-4 shadow-sm">
  <div className="card-body">
    <h3 className="card-title mb-3 fw-bold">Employee Details</h3>

    <p><strong>Name:</strong> {employee.first_name} {employee.last_name}</p>
    <p><strong>Position:</strong> {employee.position}</p>
    <p><strong>Salary:</strong> {employee.salary}</p>
    <p><strong>Department:</strong> {employee.department}</p>
    <p><strong>Date Joined:</strong> {employee.date_of_joining?.split("T")[0]}</p>

    <button className="btn btn-secondary mt-3" onClick={onClose}>
      Close
    </button>
  </div>
</div>

  );
}

export default EmployeeDetails;
