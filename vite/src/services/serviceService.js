import api from './api';

// Service management functions
export const serviceService = {
  // Get all services
  getAllServices: async () => {
    try {
      const response = await api.get('/services');
      return response;
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  },

  // Get service by ID
  getServiceById: async (id) => {
    try {
      const response = await api.get(`/services/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching service:', error);
      throw error;
    }
  },

  // Create new service
  createService: async (serviceData) => {
    try {
      const response = await api.post('/services', serviceData);
      return response;
    } catch (error) {
      console.error('Error creating service:', error);
      throw error;
    }
  },

  // Update service
  updateService: async (id, serviceData) => {
    try {
      const response = await api.put(`/services/${id}`, serviceData);
      return response;
    } catch (error) {
      console.error('Error updating service:', error);
      throw error;
    }
  },

  // Delete service
  deleteService: async (id) => {
    try {
      const response = await api.delete(`/services/${id}`);
      return response;
    } catch (error) {
      console.error('Error deleting service:', error);
      throw error;
    }
  }
};

// Other API functions
export const otherServices = {
  // Get portfolio
  getPortfolio: async () => {
    try {
      const response = await api.get('/portfolio');
      return response;
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      throw error;
    }
  },

  // Submit contact form
  submitContact: async (contactData) => {
    try {
      const response = await api.post('/contact', contactData);
      return response;
    } catch (error) {
      console.error('Error submitting contact:', error);
      throw error;
    }
  }
};
