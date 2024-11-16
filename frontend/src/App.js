import React, { useState } from 'react';
import './App.css';
// import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';

import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>
  );
}

export default App;
