import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!formData.username.trim() || !formData.password.trim()) {
      toast.error("All fields are required!");
      return;
    }

    if (formData.username.length < 3) {
      toast.error("Username must be at least 3 characters!");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find((u) => u.username === formData.username)) {
      toast.error("Username already exists!");
      return;
    }

    users.push({ ...formData });
    localStorage.setItem("users", JSON.stringify(users));
    toast.success("Signup successful!");
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-80"
      >
        <h2 className="text-blue-800 text-2xl font-bold mb-6 text-center">Signup</h2>
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
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
