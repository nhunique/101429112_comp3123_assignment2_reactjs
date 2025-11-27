import React, { useState } from "react";
import api from "../../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";

function EmployeeSearch({ setEmployees }) {
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const token = localStorage.getItem("token");

const handleSearch = async () => {
  try {
    const res = await api.get("/employees/search", {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        department: department || "",
        position: position || "",
      },
    });

    console.log(res.data);
    setEmployees(res.data.employees);
  } catch (err) {
    console.error(err);
  }
};


  return (
    <div className="mb-3 d-flex align-items-center">
      <input
        type="text"
        id="department"
        name="department"
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        className="form-control me-2"
        style={{ maxWidth: "200px" }}
      />

      <input
        type="text"
        id="position"
        name="position"
        placeholder="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        className="form-control me-2"
        style={{ maxWidth: "200px" }}
      />

      <button onClick={handleSearch} id="searchBtn" className="btn btn-primary">
        Search
      </button>
    </div>
  );
}

export default EmployeeSearch;
