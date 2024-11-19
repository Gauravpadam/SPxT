import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
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
      form.classList.add('shake');
      setTimeout(() => form.classList.remove('shake'), 500);
      return;
    }

    try {
      // For demo purposes - replace with your actual login logic
      if (formData.username === "test" && formData.password === "test") {
        navigate('/dashboard');
      } else {
        setErrors({
          submit: 'Invalid username or password'
        });
      }
    } catch (error) {
      setErrors({
        submit: 'Login failed. Please try again.'
      });
    }
  };

  return (
    <div className="login-container">
      <div className="logo-section">
        <h1>BorderlessBiz</h1>
        <p>Sign in to continue</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <span className="input-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
          </span>
          <input
            type="text"
            name="username"
            className="form-input"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <div className="error-message">{errors.username}</div>}
        </div>

        <div className="form-group">
          <span className="input-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </span>
          <input
            type="password"
            name="password"
            className="form-input"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>

        {errors.submit && <div className="error-message">{errors.submit}</div>}

        <button type="submit" className="submit-btn">
          Sign In
        </button>

        <div className="signup-link">
          Don't have an account? <a href="/signup">Create Account</a>
        </div>
      </form>
    </div>
  );
};

export default Login;