import React, { useState } from "react";
import api from "../../api/axios";
 import 'bootstrap/dist/css/bootstrap.min.css';

function EmployeeSearch({ setEmployees }) {
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");

  const handleSearch = async () => {
    try {
      const res = await api.get("/employees", {
        params: { department, position },
      });
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
   <div className="mb-3 d-flex align-items-center">
  <input
    type="text"
    placeholder="Department"
    value={department}
    onChange={(e) => setDepartment(e.target.value)}
    className="form-control me-2"
    style={{ maxWidth: "200px" }}  // Optional if you want smaller input
  />

  <input
    type="text"
    placeholder="Position"
    value={position}
    onChange={(e) => setPosition(e.target.value)}
    className="form-control me-2"
    style={{ maxWidth: "200px" }}  // Optional
  />

  <button
    onClick={handleSearch}
    className="btn btn-primary"
  >
    Search
  </button>
</div>

  );
}

export default EmployeeSearch;
