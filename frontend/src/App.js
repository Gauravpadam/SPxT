import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import Products from './components/Products';
import { BrowserRouter as Router, Routes, Route,Navigate} from "react-router-dom";


function App() {
  const isAuthenticated = () => {
    // Check for tokens and user_id in localStorage
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    const userId = localStorage.getItem("user_id");
    return accessToken && refreshToken && userId;
  };
  return (
    <Router>
    <Routes>
      <Route path="/" element={
            isAuthenticated() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          } />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/dashboard"  element={
            <Dashboard /> 
          } />
      <Route path="/products" element={
            isAuthenticated() ? <Products /> : <Navigate to="/login" />
          } />
    </Routes>
  </Router>
  );
}

export default App;
