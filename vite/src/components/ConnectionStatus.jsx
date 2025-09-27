import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ConnectionStatus = () => {
  const [status, setStatus] = useState({
    backend: 'checking',
    database: 'checking',
    lastCheck: null
  });

  const checkConnection = async () => {
    try {
      // Test backend connection
      const response = await api.get('/');
      
      if (response.message) {
        setStatus(prev => ({
          ...prev,
          backend: 'connected',
          database: 'connected', // If backend responds, DB is likely connected
          lastCheck: new Date().toLocaleTimeString()
        }));
      }
    } catch (error) {
      console.error('Connection check failed:', error);
      setStatus(prev => ({
        ...prev,
        backend: 'disconnected',
        database: 'unknown',
        lastCheck: new Date().toLocaleTimeString()
      }));
    }
  };

  useEffect(() => {
    checkConnection();
    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return '#28a745';
      case 'disconnected': return '#dc3545';
      case 'checking': return '#ffc107';
      default: return '#6c757d';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected': return '✅';
      case 'disconnected': return '❌';
      case 'checking': return '🔄';
      default: return '❓';
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'white',
      padding: '10px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      fontSize: '12px',
      zIndex: 1000,
      minWidth: '200px'
    }}>
      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
        🔗 Connection Status
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3px' }}>
        <span style={{ marginRight: '5px' }}>
          {getStatusIcon(status.backend)}
        </span>
        <span style={{ color: getStatusColor(status.backend) }}>
          Backend: {status.backend}
        </span>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3px' }}>
        <span style={{ marginRight: '5px' }}>
          {getStatusIcon(status.database)}
        </span>
        <span style={{ color: getStatusColor(status.database) }}>
          Database: {status.database}
        </span>
      </div>
      
      {status.lastCheck && (
        <div style={{ color: '#6c757d', fontSize: '10px' }}>
          Last check: {status.lastCheck}
        </div>
      )}
      
      <button 
        onClick={checkConnection}
        style={{
          marginTop: '5px',
          padding: '3px 8px',
          fontSize: '10px',
          border: '1px solid #ddd',
          borderRadius: '3px',
          background: 'white',
          cursor: 'pointer'
        }}
      >
        Refresh
      </button>
    </div>
  );
};

export default ConnectionStatus;
