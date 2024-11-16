import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault(); 
    if(username === "test" && password === "test"){
      navigate("/dashboard");
    }
    else{
      alert("Wrong username or password!");
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
        <button className="signup-button" onClick={()=>navigate("/signup")}>Signup</button>
      </div>
    </div>
  );
};

export default Login;