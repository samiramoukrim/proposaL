import api from './api';

// Reservation management functions
export const reservationService = {
  // Create new reservation
  createReservation: async (reservationData) => {
    try {
      const response = await api.post('/reservations', reservationData);
      return response;
    } catch (error) {
      console.error('Error creating reservation:', error);
      throw error;
    }
  },

  // Get all reservations (admin use)
  getAllReservations: async () => {
    try {
      const response = await api.get('/reservations');
      return response;
    } catch (error) {
      console.error('Error fetching reservations:', error);
      throw error;
    }
  },

  // Get reservation by ID
  getReservationById: async (id) => {
    try {
      const response = await api.get(`/reservations/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching reservation:', error);
      throw error;
    }
  },

  // Update reservation status
  updateReservation: async (id, updateData) => {
    try {
      const response = await api.put(`/reservations/${id}`, updateData);
      return response;
    } catch (error) {
      console.error('Error updating reservation:', error);
      throw error;
    }
  },

  // Delete reservation
  deleteReservation: async (id) => {
    try {
      const response = await api.delete(`/reservations/${id}`);
      return response;
    } catch (error) {
      console.error('Error deleting reservation:', error);
      throw error;
    }
  }
};

export default reservationService;
