import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../conf/conf.js";
import "./Login.css";
import logo from "./logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Add shake animation to form
      const form = e.target;
      form.classList.add("shake");
      setTimeout(() => form.classList.remove("shake"), 500);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      // const response = await axios.post('/login', formData);
      if (response.ok) {
        const data = await response.json();
        const { access_token, refresh_token, user_id } = data;
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        localStorage.setItem("user_id", user_id);
        navigate("/dashboard");
      } else {
        const errorData = await response.json();

        if (response.status === 400) {
          setErrors({ submit: "Credentials mismatch!" });
        } else if (response.status === 404) {
          setErrors({ submit: "User not found!" });
        } else {
          setErrors({
            submit:
              errorData.detail || "Something went wrong. Please try again.",
          });
        }
      }
    } catch (error) {
      console.log("login error : ", error);
      setErrors({ submit: "Network error. Please check your connection." });
    }
  };

  return (
    <div className="login-container">
      <div className="logo-section">
        <img src={logo} alt="Logo" className="logo-image" />
        <h1>BorderlessBiz</h1>
        <p>Sign in to continue</p>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <div className="input-icon">
            <svg
              xmlns="www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <div className="input-icon">
            <svg
              xmlns="www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0110 0v4"></path>
            </svg>
          </div>
          <input
            type="password"
            name="password"
            className="form-input"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <div className="error-message">{errors.password}</div>
          )}
        </div>
        {errors.submit && <div className="error-message">{errors.submit}</div>}
        <button type="submit" className="submit-btn">
          Sign In
        </button>

        <div className="signup-link">
          Don't have an account? <Link to="/signup">Create Account</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
