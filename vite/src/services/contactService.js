import api from './api';

// Contact management functions
export const contactService = {
  // Send contact message
  sendMessage: async (contactData) => {
    try {
      const response = await api.post('/contact', contactData);
      return response;
    } catch (error) {
      console.error('Error sending contact message:', error);
      throw error;
    }
  },

  // Get all contact messages (admin use)
  getAllMessages: async () => {
    try {
      const response = await api.get('/contact');
      return response;
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      throw error;
    }
  },

  // Get contact message by ID
  getMessageById: async (id) => {
    try {
      const response = await api.get(`/contact/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching contact message:', error);
      throw error;
    }
  },

  // Update message status
  updateMessage: async (id, updateData) => {
    try {
      const response = await api.put(`/contact/${id}`, updateData);
      return response;
    } catch (error) {
      console.error('Error updating contact message:', error);
      throw error;
    }
  },

  // Delete contact message
  deleteMessage: async (id) => {
    try {
      const response = await api.delete(`/contact/${id}`);
      return response;
    } catch (error) {
      console.error('Error deleting contact message:', error);
      throw error;
    }
  }
};

export default contactService;
