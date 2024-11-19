import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { Shield, User } from 'lucide-react';

const mockData = [
  {
    alert_name: 'name1',
  },
  {
    alert_name: 'name2',
  },
  {
    alert_name: 'name3',
  },
  {
    alert_name: 'name4',
  },
  {
    alert_name: 'name5',
  },
  {
    alert_name: 'name6',
  },
  {
    alert_name: 'name7',
  },
  {
    alert_name: 'name8',
  },
  {
    alert_name: 'name9',
  },
  {
    alert_name: 'name10',
  },
];

const Dashboard = () => {
  const [alerts, setAlerts] = useState(mockData);

  // useEffect(() => {
  //   const fetchAlerts = async () => {
  //     try {
  //       const response = await axios.get('https://your-endpoint.com/alerts');
  //       setAlerts(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchAlerts();
  // }, []);

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo">
          <Shield size={24} />
          <span className="logo-text">BorderlessBiz</span>
        </div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#notifications">Notifications</a>
          <a href="#generator">Document Generator</a>
        </div>
        <div className="profile">
          <User size={24} />
          <span>Profile</span>
        </div>
      </nav>

      <main className="main-content">
        <div className="dashboard-left">
          <section className="section alerts-section">
            <h2>Real-Time Alerts</h2>
            <div className="alerts-container">
              <div
                className="alerts-list"
                style={{
                  maxHeight: '40vh',
                  overflowY: 'auto',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: '10px',
                }}
              >
                {alerts.map((alert, index) => (
                  <div key={index} className="alert-item" style={{ marginBottom: '10px' }}>
                    <span>{alert.alert_name}</span>
                    <button className="view-btn">View</button>
                  </div>
                ))}
              </div>
            </div>
          </section>

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

        <div className="dashboard-right">
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

          <section className="section generator-section">
            <h2>Document Generator</h2>
            <div className="generator-container">
              <div className="generator-item">
                <span>Create New Compliance Document</span>
                <button className="action-btn">Start</button>
              </div>
              <div className="generator-item">
                <span>Upload Existing Document</span>
                <button className="action-btn">Upload</button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;