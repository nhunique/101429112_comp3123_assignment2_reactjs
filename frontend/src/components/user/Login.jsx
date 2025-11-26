import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email or Username"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
