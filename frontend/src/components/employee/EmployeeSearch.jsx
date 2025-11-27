import React, { useState } from "react";
import api from "../../api/axios";

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
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        style={{ marginRight: "10px", padding: "6px 10px" }}
      />
      <input
        type="text"
        placeholder="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        style={{ marginRight: "10px", padding: "6px 10px" }}
      />
      <button
        onClick={handleSearch}
        style={{
          padding: "6px 12px",
          backgroundColor: "#4a90e2",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Search
      </button>
    </div>
  );
}

export default EmployeeSearch;
