import React, { useState, useEffect } from "react";
import { Shield, ArrowLeft, Search, Filter, User } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { fetchWithAuth, clearAuthTokens } from "./auth";
import { BASE_URL } from "../conf/conf.js";
import logo from './logo.png'; 
import "./AlertsView.css";
const AlertsView = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [alerts, setAlerts] = useState([
    {
      alert_headline: "name1",
      alert_description: "desc1",
    },
    {
      alert_headline: "name2",
      alert_description: "desc2",
    },
    {
      alert_headline: "name3",
      alert_description: "desc3",
    },
  ]);

  useEffect(() => {
    const fetchAlerts = async () => {
      const token = localStorage.getItem("access_token");
      const userId = localStorage.getItem("user_id");

      try {
        const response = await fetch(
          `${BASE_URL}/get-alerts?userId=${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          setAlerts(data);
        } else {
          throw new Error("Failed to fetch alerts");
        }
      } catch (error) {
        console.error("Error fetching alerts:", error);
        setError("Failed to load alerts. Please try again later.");
      }
    };

    fetchAlerts();
  }, []);

  const handleLogout = () => {
    clearAuthTokens();
    navigate("/login");
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <nav className="navbar">
        <div className="logo">
        <img 
              src={logo} 
              alt="Logo" 
              width={40} 
              height={40} 
            />
          <span className="logo-text">BorderlessBiz</span>
        </div>
        <div className="nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/products">Products</Link>
          <Link to="/notifications" className="active">
            Notifications
          </Link>
          <Link to="/generator">Document Generator</Link>
        </div>
        <div className="profile">
          <div
            className="profile-menu"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            <User size={24} />
            <span>Logout</span>
          </div>
        </div>
      </nav>

      <h1 style={{ marginTop: "40px", marginLeft: "170px" }}>Alerts</h1>
      <div className="alertview-container">
        {/* Product list section */}
        <div className="alertview-list">
          {alerts.map((alert, index) => (
            <div key={index} className="alert-card">
              <h2>{alert.alert_headline}</h2>
              <p>{alert.alert_description}</p>
            </div>
          ))}
          {alerts.length === 0 && <p>No alerts yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default AlertsView;
