import React, { useState, useEffect } from 'react';
import { Shield, ArrowLeft, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './AlertsView.css'
const AlertsView = () => {
  const location = useLocation(); const { alerts } = location.state || {}; 
  const navigate = useNavigate();
  // const [alerts, setAlerts] = useState([
  //   {
  //     alert_headline: 'name1',
  //     alert_description: "desc1",
  //     severity: 'High',
  //     date: '2024-03-20',
  //     status: 'Active'
  //   },
  //   {
  //     alert_headline: 'name2',
  //     alert_description: "desc2",
  //     severity: 'Medium',
  //     date: '2024-03-19',
  //     status: 'Pending'
  //   },
  //   {
  //     alert_headline: 'name3',
  //     alert_description: "desc3",
  //     severity: 'Low',
  //     date: '2024-03-18',
  //     status: 'Resolved'
  //   }
  // ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      const userId = localStorage.getItem('user_id');
      
      try {
        const response = await fetch(`http://localhost:8000/get-alerts?userId=${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setAlerts(data);
        } else {
          throw new Error('Failed to fetch alerts');
        }
      } catch (error) {
        console.error('Error fetching alerts:', error);
        setError('Failed to load alerts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

   // fetchAlerts();
  }, []);

  const handleBack = () => {
    navigate('/dashboard');
  };

  const filteredAlerts = alerts.filter(alert =>
    alert.alert_headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.alert_description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'text-red-500 bg-red-500/10';
      case 'medium':
        return 'text-yellow-500 bg-yellow-500/10';
      case 'low':
        return 'text-green-500 bg-green-500/10';
      default:
        return 'text-blue-500 bg-blue-500/10';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'text-green-500 bg-green-500/10';
      case 'pending':
        return 'text-yellow-500 bg-yellow-500/10';
      case 'resolved':
        return 'text-blue-500 bg-blue-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  return (
    
    
    <div>
    <h1>
      Alerts
    </h1>
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
  </div></div>
    
  );
};

export default AlertsView;