import React from 'react';
import { Link } from 'react-router-dom';

const ServicesLinkTest = () => {
  const allServices = [
    { id: 1, title: "Marriage Proposal Planning", price: "$1,500" },
    { id: 2, title: "Anniversary & Date Night", price: "$800" },
    { id: 3, title: "Event Rentals", price: "$500" },
    { id: 4, title: "Shop the Edit", price: "$300" },
    { id: 5, title: "Elopement & Micro-Wedding Planning", price: "$2,500" },
    { id: 6, title: "Proposal Photography", price: "$800" }
  ];

  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'Inter, sans-serif',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      minHeight: '100vh'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          textAlign: 'center', 
          marginBottom: '40px',
          fontSize: '2.5rem',
          color: '#2c3e50',
          fontWeight: '700'
        }}>
          🔗 Test des Liens - Tous les Services
        </h1>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '25px',
          marginBottom: '40px'
        }}>
          {allServices.map(service => (
            <div key={service.id} style={{
              background: 'white',
              padding: '30px',
              borderRadius: '20px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(0, 123, 255, 0.1)',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Barre colorée en haut */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: `linear-gradient(90deg, 
                  ${service.id === 1 ? '#007bff, #0056b3' : 
                    service.id === 2 ? '#28a745, #20c997' :
                    service.id === 3 ? '#ffc107, #fd7e14' :
                    service.id === 4 ? '#dc3545, #c82333' :
                    service.id === 5 ? '#6f42c1, #5a32a3' :
                    '#17a2b8, #138496'})`
              }} />

              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ 
                  fontSize: '1.4rem', 
                  color: '#2c3e50', 
                  marginBottom: '10px',
                  fontWeight: '600'
                }}>
                  Service {service.id}: {service.title}
                </h3>
                <p style={{ 
                  color: '#6c757d', 
                  fontSize: '1.1rem',
                  fontWeight: '500'
                }}>
                  Prix: {service.price}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <Link 
                  to={`/service/${service.id}`}
                  style={{
                    padding: '12px 20px',
                    background: 'linear-gradient(135deg,rgb(255, 0, 144),rgb(1, 19, 105))',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '25px',
                    fontWeight: '600',
                    fontSize: '0.95rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 20px rgba(255, 0, 170, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  📖 Voir les détails
                </Link>

                <button 
                  onClick={() => {
                    window.open(`/service/${service.id}`, '_blank');
                  }}
                  style={{
                    padding: '12px 20px',
                    background: 'linear-gradient(135deg,rgb(167, 40, 85),rgb(201, 32, 105))',
                    color: 'white',
                    border: 'none',
                    borderRadius: '25px',
                    fontWeight: '600',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 20px rgba(40, 167, 69, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  🔗 Nouvel onglet
                </button>
              </div>

              <div style={{ 
                marginTop: '15px', 
                padding: '10px', 
                background: '#f8f9fa', 
                borderRadius: '8px',
                fontSize: '0.9rem',
                color: '#6c757d'
              }}>
                <strong>URL:</strong> /service/{service.id}
              </div>
            </div>
          ))}
        </div>

        {/* Section d'instructions */}
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(0, 123, 255, 0.1)'
        }}>
          <h2 style={{ 
            color: '#2c3e50', 
            marginBottom: '20px',
            fontSize: '1.8rem',
            fontWeight: '600'
          }}>
            📋 Instructions de test
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div>
              <h3 style={{ color: '#007bff', marginBottom: '10px' }}>✅ Ce qui devrait fonctionner :</h3>
              <ul style={{ color: '#6c757d', lineHeight: '1.6' }}>
                <li>Tous les boutons "📖 Voir les détails" redirigent vers /service/X</li>
                <li>Chaque service (1-6) a sa propre page de détails</li>
                <li>Les pages de détails affichent le contenu correct</li>
                <li>Navigation de retour vers /services fonctionne</li>
              </ul>
            </div>
            
            <div>
              <h3 style={{ color: '#28a745', marginBottom: '10px' }}>🧪 Comment tester :</h3>
              <ul style={{ color: '#6c757d', lineHeight: '1.6' }}>
                <li>Cliquez sur "Voir les détails" pour chaque service</li>
                <li>Vérifiez que le contenu correspond au service</li>
                <li>Testez les boutons d'action sur chaque page</li>
                <li>Vérifiez la navigation de retour</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link 
            to="/services" 
            style={{
              padding: '15px 30px',
              background: 'linear-gradient(135deg, #6c757d, #495057)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '25px',
              fontWeight: '600',
              fontSize: '1.1rem',
              marginRight: '15px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            ← Page Services
          </Link>
          
          <Link 
            to="/services-debug" 
            style={{
              padding: '15px 30px',
              background: 'linear-gradient(135deg, #17a2b8, #138496)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '25px',
              fontWeight: '600',
              fontSize: '1.1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            🔧 Debug Services
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesLinkTest;
