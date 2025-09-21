import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) =>
        u.username === formData.username && u.password === formData.password
    );

    if (!user) {
      toast.error("Invalid credentials!");
      return;
    } 

    // Save logged in user
    localStorage.setItem(
      "user",
      JSON.stringify({ username: user.username, isLoggedIn: true })
    );

    toast.success("Login successful!");
    navigate("/"); // go to dashboard
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent opacity-90">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-80"
      >
        <h2 className="text-blue-900 text-4xl font-bold mb-6 text-center">Login</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="border p-2 mb-4 w-full rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 mb-4 w-full rounded"
        />
        <button className="bg-blue-800 text-white px-4 py-2 rounded w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
