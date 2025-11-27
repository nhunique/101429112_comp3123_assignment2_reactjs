import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
 import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", {
        email: emailOrUsername.includes("@") ? emailOrUsername : undefined,
        username: !emailOrUsername.includes("@") ? emailOrUsername : undefined,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/employees"); // go to employee page
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };


  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
  <div className="bg-white p-4 rounded-4 shadow" style={{ width: "350px", textAlign: "center" }}>
    <h2 className="mb-4 fw-bold">Login</h2>
    
    <form onSubmit={handleLogin}>
      <input
        type="text"
        className="form-control mb-3 py-2"
        placeholder="Username"
        value={emailOrUsername}
        onChange={(e) => setEmailOrUsername(e.target.value)}
      />

      <input
        type="password"
        className="form-control mb-3 py-2"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="submit"
        className="btn btn-primary w-100 py-2 mt-2"
      >
        Login
      </button>
    </form>
  </div>
</div>

  );
}

export default Login;