import React, { useState } from 'react';
import { useApi, useApiMutation } from '../hooks/useApi';
import { userService } from '../services/userService';
import { serviceService, otherServices } from '../services/serviceService';

const ApiTest = () => {
  const [newUser, setNewUser] = useState({ name: '', email: '', age: '' });
  
  // Fetch data using custom hooks
  const { data: users, loading: usersLoading, error: usersError, refetch: refetchUsers } = useApi(userService.getAllUsers);
  const { data: services, loading: servicesLoading, error: servicesError } = useApi(serviceService.getAllServices);
  const { data: portfolio, loading: portfolioLoading, error: portfolioError } = useApi(otherServices.getPortfolio);
  
  // Mutation hook for creating users
  const { mutate, loading: mutationLoading, error: mutationError } = useApiMutation();

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await mutate(userService.createUser, {
        name: newUser.name,
        email: newUser.email,
        age: parseInt(newUser.age) || 0
      });
      setNewUser({ name: '', email: '', age: '' });
      refetchUsers(); // Refresh the users list
      alert('User created successfully!');
    } catch (error) {
      alert('Error creating user: ' + error.message);
    }
  };

  const testContactForm = async () => {
    try {
      await mutate(otherServices.submitContact, {
        name: 'Test User',
        email: 'test@example.com',
        message: 'This is a test message from frontend'
      });
      alert('Contact form submitted successfully!');
    } catch (error) {
      alert('Error submitting contact form: ' + error.message);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🔗 Backend API Connection Test</h1>
      
      {/* Users Section */}
      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>👥 Users</h2>
        {usersLoading && <p>Loading users...</p>}
        {usersError && <p style={{ color: 'red' }}>Error: {usersError.message}</p>}
        {users && (
          <div>
            <p><strong>Total Users:</strong> {users.length}</p>
            <ul>
              {users.map(user => (
                <li key={user._id}>
                  {user.name} - {user.email} (Age: {user.age})
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Create User Form */}
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
          <h3>Add New User</h3>
          <form onSubmit={handleCreateUser}>
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({...newUser, name: e.target.value})}
              required
              style={{ margin: '5px', padding: '8px' }}
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({...newUser, email: e.target.value})}
              required
              style={{ margin: '5px', padding: '8px' }}
            />
            <input
              type="number"
              placeholder="Age"
              value={newUser.age}
              onChange={(e) => setNewUser({...newUser, age: e.target.value})}
              style={{ margin: '5px', padding: '8px' }}
            />
            <button 
              type="submit" 
              disabled={mutationLoading}
              style={{ margin: '5px', padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px' }}
            >
              {mutationLoading ? 'Creating...' : 'Create User'}
            </button>
          </form>
          {mutationError && <p style={{ color: 'red' }}>Error: {mutationError.message}</p>}
        </div>
      </div>

      {/* Services Section */}
      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>🛠️ Services</h2>
        {servicesLoading && <p>Loading services...</p>}
        {servicesError && <p style={{ color: 'red' }}>Error: {servicesError.message}</p>}
        {services && (
          <div>
            <p><strong>Total Services:</strong> {services.length}</p>
            <ul>
              {services.map(service => (
                <li key={service._id}>
                  {service.title} - {service.category}
                  {service.price && ` ($${service.price})`}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Portfolio Section */}
      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>🎨 Portfolio</h2>
        {portfolioLoading && <p>Loading portfolio...</p>}
        {portfolioError && <p style={{ color: 'red' }}>Error: {portfolioError.message}</p>}
        {portfolio && (
          <div>
            <p><strong>Portfolio Items:</strong> {portfolio.length}</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {portfolio.map(item => (
                <img 
                  key={item.id} 
                  src={item.image} 
                  alt={`Portfolio ${item.id}`}
                  style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '5px' }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Contact Test */}
      <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>📧 Contact Form Test</h2>
        <button 
          onClick={testContactForm}
          disabled={mutationLoading}
          style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          {mutationLoading ? 'Sending...' : 'Test Contact Form'}
        </button>
      </div>
    </div>
  );
};

export default ApiTest;
