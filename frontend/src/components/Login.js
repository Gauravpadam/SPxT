import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Basic validation (add more validation as needed)
    if (username && password) {
      onLogin(); // Call the function to move to the dashboard after login
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>CompliGuard Login</h2>
        <form onSubmit={handleLogin}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <a href="#" className="forgot-password">Forgot password?</a>
      </div>
    </div>
  );
};

export default Login;
