import React from 'react';
import { Link } from 'react-router-dom';

const ServicesDebug = () => {
  // Test direct des liens
  const testServices = [
    { id: 1, title: "Marriage Proposal Planning" },
    { id: 2, title: "Anniversary & Date Night" },
    { id: 3, title: "Event Rentals" },
    { id: 4, title: "Shop the Edit" }
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🔧 Debug - Test des liens Services</h1>
      
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#000000ff', 
        borderRadius: '8px', 
        marginBottom: '30px',
        border: '2px solid #007bff'
      }}>
        <h2>🧪 Test direct des liens</h2>
        <p>Cliquez sur ces boutons pour tester la navigation :</p>
        
        <div style={{ display: 'grid', gap: '15px', marginTop: '20px' }}>
          {testServices.map(service => (
            <div key={service.id} style={{ 
              padding: '15px', 
              backgroundColor: 'white', 
              borderRadius: '8px',
              border: '1px solid #dee2e6',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontWeight: 'bold' }}>
                {service.title}
              </span>
              <Link 
                to={`/service/${service.id}`}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '5px',
                  fontWeight: '600'
                }}
                onClick={(e) => {
                  console.log(`Navigating to: /service/${service.id}`);
                  alert(`Navigation vers: /service/${service.id}`);
                }}
              >
                📖 Voir les détails
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div style={{ 
        padding: '20px', 
        backgroundColor: '#fff3cd', 
        borderRadius: '8px', 
        border: '2px solid #ffc107'
      }}>
        <h3>⚠️ Si les liens ne fonctionnent pas :</h3>
        <ol>
          <li><strong>Videz le cache :</strong> Ctrl + F5 ou Ctrl + Shift + R</li>
          <li><strong>Vérifiez l'URL :</strong> Vous devriez voir /service/1, /service/2, etc.</li>
          <li><strong>Ouvrez la console :</strong> F12 → Console pour voir les erreurs</li>
          <li><strong>Testez directement :</strong> Tapez http://localhost:3007/service/1 dans l'URL</li>
        </ol>
      </div>

      <div style={{ 
        padding: '20px', 
        backgroundColor: '#000000ff', 
        borderRadius: '8px', 
        marginTop: '20px',
        border: '2px solid #17a2b8'
      }}>
        <h3>📋 Informations de debug :</h3>
        <ul>
          <li><strong>URL actuelle :</strong> {window.location.href}</li>
          <li><strong>Pathname :</strong> {window.location.pathname}</li>
          <li><strong>Timestamp :</strong> {new Date().toLocaleTimeString()}</li>
        </ul>
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <Link 
          to="/services" 
          style={{
            padding: '12px 24px',
            backgroundColor: '#6c757d',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            marginRight: '10px'
          }}
        >
          ← Retour à Services
        </Link>
        
        <Link 
          to="/nav-test" 
          style={{
            padding: '12px 24px',
            backgroundColor: '#28a745',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px'
          }}
        >
          Page de test navigation
        </Link>
      </div>
    </div>
  );
};

export default ServicesDebug;
