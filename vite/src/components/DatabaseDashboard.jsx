import React, { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import { serviceService } from '../services/serviceService';
import { useApi, useApiMutation } from '../hooks/useApi';

const DatabaseDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    services: 0,
    loading: true
  });

  // Fetch data using custom hooks
  const { data: users, loading: usersLoading, error: usersError, refetch: refetchUsers } = useApi(userService.getAllUsers);
  const { data: services, loading: servicesLoading, error: servicesError, refetch: refetchServices } = useApi(serviceService.getAllServices);
  
  // Mutation hook for operations
  const { mutate, loading: mutationLoading } = useApiMutation();

  // Update stats when data changes
  useEffect(() => {
    setStats({
      users: users?.length || 0,
      services: services?.length || 0,
      loading: usersLoading || servicesLoading
    });
  }, [users, services, usersLoading, servicesLoading]);

  // Create sample user
  const createSampleUser = async () => {
    const sampleUsers = [
      { name: 'Samira Moukrim', email: 'samira@example.com', age: 28 },
      { name: 'Ahmed Hassan', email: 'ahmed@example.com', age: 32 },
      { name: 'Fatima Zahra', email: 'fatima@example.com', age: 25 }
    ];
    
    const randomUser = sampleUsers[Math.floor(Math.random() * sampleUsers.length)];
    randomUser.email = `${randomUser.name.toLowerCase().replace(' ', '.')}${Date.now()}@example.com`;
    
    try {
      await mutate(userService.createUser, randomUser);
      refetchUsers();
      alert('Sample user created successfully!');
    } catch (error) {
      alert('Error creating user: ' + error.message);
    }
  };

  // Create sample service
  const createSampleService = async () => {
    const sampleServices = [
      {
        title: 'Marriage Proposal Planning',
        description: 'We craft personalized proposal experiences with attention to every detail.',
        price: 1500,
        category: 'Marriage Proposal Planning'
      },
      {
        title: 'Anniversary & Date Night',
        description: 'From intimate dinners to stylish anniversary setups.',
        price: 800,
        category: 'Anniversary & Date Night'
      },
      {
        title: 'Event Rentals',
        description: 'Hand-picked furniture and décor to elevate your event.',
        price: 500,
        category: 'Event Rentals'
      }
    ];
    
    const randomService = sampleServices[Math.floor(Math.random() * sampleServices.length)];
    randomService.title = `${randomService.title} ${Date.now()}`;
    
    try {
      await mutate(serviceService.createService, randomService);
      refetchServices();
      alert('Sample service created successfully!');
    } catch (error) {
      alert('Error creating service: ' + error.message);
    }
  };

  // Delete user
  const deleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await mutate(userService.deleteUser, userId);
        refetchUsers();
        alert('User deleted successfully!');
      } catch (error) {
        alert('Error deleting user: ' + error.message);
      }
    }
  };

  // Delete service
  const deleteService = async (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await mutate(serviceService.deleteService, serviceId);
        refetchServices();
        alert('Service deleted successfully!');
      } catch (error) {
        alert('Error deleting service: ' + error.message);
      }
    }
  };

  const refreshAll = () => {
    refetchUsers();
    refetchServices();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>🗄️ Database Dashboard</h1>
        <button 
          onClick={refreshAll}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          🔄 Refresh All
        </button>
      </div>

      {/* Statistics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px', 
          textAlign: 'center',
          border: '1px solid #dee2e6'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#495057' }}>👥 Total Users</h3>
          <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#007bff' }}>
            {stats.loading ? '...' : stats.users}
          </div>
        </div>
        
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px', 
          textAlign: 'center',
          border: '1px solid #dee2e6'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#495057' }}>🛠️ Total Services</h3>
          <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#28a745' }}>
            {stats.loading ? '...' : stats.services}
          </div>
        </div>
        
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px', 
          textAlign: 'center',
          border: '1px solid #dee2e6'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#495057' }}>📊 Database Status</h3>
          <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#28a745' }}>
            {(usersError || servicesError) ? '❌ Error' : '✅ Connected'}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px', 
        marginBottom: '30px',
        border: '1px solid #dee2e6'
      }}>
        <h3>⚡ Quick Actions</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            onClick={createSampleUser}
            disabled={mutationLoading}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: mutationLoading ? 'not-allowed' : 'pointer'
            }}
          >
            👤 Add Sample User
          </button>
          <button 
            onClick={createSampleService}
            disabled={mutationLoading}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#28a745', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: mutationLoading ? 'not-allowed' : 'pointer'
            }}
          >
            🛠️ Add Sample Service
          </button>
        </div>
      </div>

      {/* Users Section */}
      <div style={{ marginBottom: '30px' }}>
        <h2>👥 Users ({users?.length || 0})</h2>
        {usersLoading && <p>Loading users...</p>}
        {usersError && <p style={{ color: 'red' }}>Error: {usersError.message}</p>}
        {users && users.length === 0 && <p style={{ color: '#6c757d' }}>No users found. Add some sample data!</p>}
        
        {users && users.length > 0 && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Email</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Age</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Created</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{user.name}</td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{user.email}</td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{user.age || 'N/A'}</td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'center' }}>
                      <button 
                        onClick={() => deleteUser(user._id)}
                        disabled={mutationLoading}
                        style={{ 
                          padding: '4px 8px', 
                          backgroundColor: '#dc3545', 
                          color: 'white', 
                          border: 'none', 
                          borderRadius: '3px',
                          cursor: mutationLoading ? 'not-allowed' : 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Services Section */}
      <div>
        <h2>🛠️ Services ({services?.length || 0})</h2>
        {servicesLoading && <p>Loading services...</p>}
        {servicesError && <p style={{ color: 'red' }}>Error: {servicesError.message}</p>}
        {services && services.length === 0 && <p style={{ color: '#6c757d' }}>No services found. Add some sample data!</p>}
        
        {services && services.length > 0 && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Title</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Category</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Price</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Status</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Created</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map(service => (
                  <tr key={service._id}>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{service.title}</td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{service.category}</td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                      {service.price ? `$${service.price}` : 'Free'}
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                      {service.isActive ? '✅ Active' : '❌ Inactive'}
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                      {service.createdAt ? new Date(service.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'center' }}>
                      <button 
                        onClick={() => deleteService(service._id)}
                        disabled={mutationLoading}
                        style={{ 
                          padding: '4px 8px', 
                          backgroundColor: '#dc3545', 
                          color: 'white', 
                          border: 'none', 
                          borderRadius: '3px',
                          cursor: mutationLoading ? 'not-allowed' : 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatabaseDashboard;
