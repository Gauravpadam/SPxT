import React from 'react';
import './Dashboard.css';
import { Shield, User } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <Shield size={24} />
          <span>BorderlessBiz</span>
        </div>
        <div className="nav-links">
          <a href="/home">Home</a>
          <a href="/products">Products</a>
          <a href="/notifications">Notifications</a>
          <a href="/generator">Document Generator</a>
        </div>
        <div className="profile">
          <User size={24} />
          <span>Profile</span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {/* Left Column */}
        <div className="dashboard-left">
          {/* Alerts Section */}
          <section className="section alerts-section">
            <h2>Real-Time Alerts</h2>
            <div className="alerts-container">
              <div className="alert-item">
                <span>Policy Breach Detected</span>
                <button className="view-btn">View</button>
              </div>
              <div className="alert-item">
                <span>Compliance Deadline Approaching</span>
                <button className="view-btn">View</button>
              </div>
              <div className="alert-item">
                <span>New Regulation Alert</span>
                <button className="view-btn">View</button>
              </div>
            </div>
          </section>

          {/* Chatbot Section */}
          <section className="section chatbot-section">
            <h2>Smart Compliance Chatbot</h2>
            <div className="chatbot-container">
              <div className="chatbot-message">
                <span className="chatbot-label">Chatbot:</span>
                <p>How can I assist you with compliance today?</p>
              </div>
              <input 
                type="text" 
                placeholder="Ask me anything about compliance..." 
                className="chatbot-input"
              />
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="dashboard-right">
          {/* News Feed Section */}
          <section className="section news-section">
            <h2>Customized News Feed</h2>
            <div className="news-container">
              <div className="news-item">
                <h3>Latest Industry Update: Compliance Trends</h3>
                <p>Stay ahead with the recent changes in compliance regulations affecting your industry.</p>
              </div>
              <div className="news-item">
                <h3>Tech Advances in Compliance</h3>
                <p>Discover how AI and machine learning are revolutionizing compliance management.</p>
              </div>
              <div className="news-item">
                <h3>Global Compliance Updates</h3>
                <p>An overview of new compliance measures being adopted worldwide.</p>
              </div>
            </div>
          </section>

          {/* Document Generator Section */}
          <section className="section generator-section">
            <h2>Document Generator</h2>
            <div className="generator-container">
              <div className="generator-item">
                <span>Create New Compliance Document</span>
                <button className="action-btn start-btn">Start</button>
              </div>
              <div className="generator-item">
                <span>Upload Existing Document</span>
                <button className="action-btn upload-btn">Upload</button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;