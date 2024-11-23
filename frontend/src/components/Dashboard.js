import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchWithAuth, clearAuthTokens } from "./auth";
import { Shield, User } from "lucide-react";
import { BASE_URL } from "../conf/conf.js";
import logo from './logo.png'; 
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { user: "Chatbot", message: "How can I assist you with compliance today?" },
  ]);
  const [chatMessage, setChatMessage] = useState("");
  const [newsItems, setNewsItems] = useState([
    {
      title: "Latest Industry Update: Compliance Trends",
      content:
        "Stay ahead with the recent changes in compliance regulations affecting your industry.",
    },
    {
      title: "Tech Advances in Compliance",
      content:
        "Discover how AI and machine learning are revolutionizing compliance management.",
    },
    {
      title: "Global Compliance Updates",
      content:
        "An overview of new compliance measures being adopted worldwide.",
    },
  ]);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        navigate("/login");
        return;
      }
    };

    const isAuthorized = async () => {
      const token = localStorage.getItem("access_token");
      const str = `Bearer ${token}`;
      console.log(str);

      try {
        const response = await fetch(`${BASE_URL}/query_chatbot`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log(response.status);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
        } else {
          alert("Response is not ok!");
        }
      } catch (error) {
        alert("Error ", error.message);
      }
    };

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
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
    console.log(alerts);
  }, [navigate]);

  const handleLogout = () => {
    clearAuthTokens();
    navigate("/login");
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    const newChat = { user: "User", message: chatMessage.trim() };
    setChatMessages((prev) => [...prev, newChat]);
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(`${BASE_URL}/query_chatbot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query: chatMessage }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const botResponse = { user: "Chatbot", message: data.response };
      setChatMessages((prev) => [...prev, botResponse]);
      setChatMessage("");
    } catch (error) {
      const errorMessage = { user: "Chatbot", message: error.message };
      setChatMessages((prev) => [...prev, errorMessage]);
      setChatMessage("");
    }
  };

  const handleViewAlerts = () => {
    navigate("/notifications");
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo">
          {/* <Shield size={24} /> */}
                  <img 
              src={logo} 
              alt="Logo" 
              width={40} 
              height={40} 
            />
          <span className="logo-text">BorderlessBiz</span>
        </div>
        <div className="nav-links">
          <Link to="/dashboard" className="active">
            Dashboard
          </Link>
          <Link to="/products">Products</Link>
          <Link to="/notifications">Notifications</Link>
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

      <main className="main-content">
        <div className="dashboard-left">
          <section className="section alerts-section">
            <div className="alerts-header">
              <h2>Real-Time Alerts</h2>
              <button className="view-btn" onClick={handleViewAlerts}>
                View All Alerts
              </button>
            </div>
            <div className="alerts-container">
              {loading ? (
                <div className="loading-spinner">Loading alerts...</div>
              ) : error ? (
                <div className="error-message">{error}</div>
              ) : alerts.length === 0 ? (
                <div className="no-alerts">No alerts to display</div>
              ) : (
                <div className="alerts-list">
                  {alerts.map((alert, index) => (
                    <div key={index} className="alert-item">
                      <span>{alert.alert_headline}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="section chatbot-section">
            <h2>Smart Compliance Chatbot</h2>
            <div className="chatbot-container">
              <div className="chatbot-messages">
                {chatMessages.map((response, index) => (
                  <div key={index} className="chatbot-message">
                    <span className="chatbot-label">{response.user}</span>
                    <p>{response.message}</p>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleChatSubmit} className="chatbot-input-form">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Ask me anything about compliance..."
                  className="chatbot-input"
                />
                <button type="submit" className="chat-submit-btn">
                  Send
                </button>
              </form>
            </div>
          </section>
        </div>

        <div className="dashboard-right">
          <section className="section news-section">
            <h2>Customized News Feed</h2>
            <div className="news-container">
              {newsItems.map((news, index) => (
                <div key={index} className="news-item">
                  <h3>{news.title}</h3>
                  <p>{news.content}</p>
                  <button className="read-more-btn">Read More</button>
                </div>
              ))}
            </div>
          </section>

          <section className="section generator-section">
            <h2>Document Generator</h2>
            <div className="generator-container">
              <div className="generator-item">
                <span>Create New Forms</span>
                <button
                  className="action-btn"
                  onClick={() => navigate("/generator")}
                >
                  Start
                </button>
              </div>
              <div className="generator-item">
                <span>Upload Existing Document</span>
                <button className="action-btn coming-soon" disabled title="">
                  <span>Upload</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
