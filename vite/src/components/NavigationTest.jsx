import React from 'react';
import { Link } from 'react-router-dom';

const NavigationTest = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🧭 Test de Navigation - Services</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <h2>Liens directs vers les pages de détails :</h2>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <Link 
            to="/service/1" 
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#007bff', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '5px' 
            }}
          >
            Service 1 - Marriage Proposal
          </Link>
          <Link 
            to="/service/2" 
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#28a745', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '5px' 
            }}
          >
            Service 2 - Anniversary
          </Link>
          <Link 
            to="/service/3" 
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#ffc107', 
              color: 'black', 
              textDecoration: 'none', 
              borderRadius: '5px' 
            }}
          >
            Service 3 - Event Rentals
          </Link>
          <Link 
            to="/service/4" 
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#dc3545', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '5px' 
            }}
          >
            Service 4 - Shop the Edit
          </Link>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>Navigation normale :</h2>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <Link 
            to="/services" 
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#6c757d', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '5px' 
            }}
          >
            Page Services
          </Link>
          <Link 
            to="/StartPlanning" 
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#17a2b8', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '5px' 
            }}
          >
            Start Planning
          </Link>
          <Link 
            to="/contact" 
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#fd7e14', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '5px' 
            }}
          >
            Contact
          </Link>
        </div>
      </div>

      <div style={{ 
        padding: '20px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <h3>Instructions de test :</h3>
        <ol>
          <li>Cliquez sur les boutons "Service X" ci-dessus pour tester les pages de détails</li>
          <li>Ou allez sur la page Services et cliquez sur "Learn More"</li>
          <li>Vérifiez que vous arrivez bien sur la page de détails et non sur Start Planning</li>
        </ol>
        
        <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#d1ecf1', borderRadius: '5px' }}>
          <strong>Note :</strong> Si les liens ne fonctionnent pas, vérifiez que le serveur Vite a bien redémarré.
        </div>
      </div>
    </div>
  );
};

export default NavigationTest;
