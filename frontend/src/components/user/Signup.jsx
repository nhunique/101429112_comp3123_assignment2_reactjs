import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
 import 'bootstrap/dist/css/bootstrap.min.css';

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await api.post("/signup", { username, email, password });
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
  <div className="bg-white p-4 rounded-4 shadow" style={{ width: "350px", textAlign: "center" }}>
    <h2 className="mb-4 fw-bold">Sign Up</h2>

    <form onSubmit={handleSignup}>
      <input
        type="text"
        className="form-control mb-3 py-2"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <input
        type="email"
        className="form-control mb-3 py-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        className="form-control mb-3 py-2"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        className="btn btn-primary w-100 py-2 mt-2"
      >
        Sign Up
      </button>
    </form>
  </div>
</div>

  );
}

export default Signup;
