import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Real-Time Alerts Section */}
      <div className="section alerts">
        <h2>Real-Time Alerts</h2>
        <div className="alert-item">Policy Breach Detected <button>View</button></div>
        <div className="alert-item">Compliance Deadline Approaching <button>View</button></div>
        <div className="alert-item">New Regulation Alert <button>View</button></div>
      </div>

      {/* Customized News Feed Section */}
      <div className="section news">
        <h2>Customized News Feed</h2>
        <div className="news-item">
          <strong>Latest Industry Update: Compliance Trends</strong>
          <p>Stay ahead with the recent changes in compliance regulations affecting your industry.</p>
        </div>
        <div className="news-item">
          <strong>Tech Advances in Compliance</strong>
          <p>Discover how AI and machine learning are revolutionizing compliance management.</p>
        </div>
        <div className="news-item">
          <strong>Global Compliance Updates</strong>
          <p>An overview of new compliance measures being adopted worldwide.</p>
        </div>
      </div>

      {/* Smart Compliance Chatbot Section */}
      <div className="section chatbot">
        <h2>Smart Compliance Chatbot</h2>
        <input type="text" placeholder="Ask me anything about compliance..." />
        <div className="chatbot-response">Chatbot: How can I assist you with compliance today?</div>
      </div>

      {/* Document Generator Section */}
      <div className="section document-generator">
        <h2>Document Generator</h2>
        <button>Create New Compliance Document</button>
        <button>Upload Existing Document</button>
      </div>
    </div>
  );
};

export default Dashboard;
