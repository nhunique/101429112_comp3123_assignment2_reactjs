import React, { useEffect, useState, useCallback } from "react";
import api from "../../api/axios";
import EmployeeForm from "./EmployeeForm";
import EmployeeDetails from "./EmployeeDetails";
import EmployeeSearch from "./EmployeeSearch";
import LogoutButton from "../../components/LogoutButton";
import "bootstrap/dist/css/bootstrap.min.css";

function Employee() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState("add"); // "add" or "edit"
  const [showDetails, setShowDetails] = useState(false);

  const token = localStorage.getItem("token");

  // Wrap in useCallback
  const fetchEmployees = useCallback(async () => {
    try {
      const response = await api.get("/employees", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(response.data.employees);
    } catch (err) {
      alert("Failed to fetch employees");
      console.error(err);
    }
  }, [token]); // dependency array includes token

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]); // include fetchEmployees in dependency array

  // Delete employee
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;
    try {
      await api.delete(`/employees?eid=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEmployees();
    } catch (err) {
      alert("Failed to delete employee");
    }
  };

  // Open form for add
  const handleAdd = () => {
    setFormMode("add");
    setSelectedEmployee(null);
    setShowForm(true);
  };

  // Open form for edit
  const handleEdit = (employee) => {
    setFormMode("edit");
    setSelectedEmployee(employee);
    setShowForm(true);
  };

  // Open details modal
  const handleView = (employee) => {
    setSelectedEmployee(employee);
    setShowDetails(true);
  };
  return (
    <div className="min-vh-100 p-4 bg-light">
      <div className="d-flex justify-content-end mb-3">
        <LogoutButton />
      </div>
      <h2 className="mb-4 fw-bold text-dark">Employee Management</h2>

      <EmployeeSearch setEmployees={setEmployees} />

      <button className="btn btn-primary mb-3" onClick={handleAdd}>
        Add Employee
      </button>

      <div className="table-responsive">
        <table className="table table-bordered table-hover bg-white rounded">
          <thead className="bg-primary text-white">
            <tr>
              <th>Name</th>
              <th>Profile Picture</th>
              <th>Email</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Department</th>
              <th>Date Joined</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id}>
                <td>
                  {emp.first_name} {emp.last_name}
                </td>
                <td>
                  <img
                    src={`http://localhost:5000/uploads/${emp.profile_picture}`}
                    alt="Profile"
                    width="50"
                  />
                </td>
                <td>{emp.email}</td>
                <td>{emp.position}</td>
                <td>{emp.salary}</td>
                <td>{emp.department}</td>
                <td>{emp.date_of_joining?.split("T")[0]}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleView(emp)}
                  >
                    View
                  </button>

                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(emp)}
                  >
                    Update
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(emp._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <EmployeeForm
          mode={formMode}
          employee={selectedEmployee}
          onClose={() => setShowForm(false)}
          refresh={fetchEmployees}
        />
      )}

      {showDetails && (
        <EmployeeDetails
          employee={selectedEmployee}
          onClose={() => setShowDetails(false)}
        />
      )}
    </div>
  );
}

export default Employee;
