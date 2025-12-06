import apiClient from './axiosConfig';

/**
 * Authentication Service
 * Contains all API calls related to user authentication
 */
export const authService = {
  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise} Response with token and user data
   */
  login: async (email, password) => {
    const response = await apiClient.post('/api/auth/login', {
      email,
      password,
    });
    
    // Save token and user info to localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    
    return response.data;
  },

  /**
   * Logout user (clear local storage)
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * Get current logged in user from localStorage
   * @returns {Object|null} User object or null if not logged in
   */
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Register SuperAdmin (first user)
   * @param {string} email 
   * @param {string} password 
   * @param {string} nombreLiga 
   */
  registerSuperAdmin: async (email, password, nombreLiga) => {
    const response = await apiClient.post('/api/auth/register/superadmin', {
      email,
      password,
      nombreLiga,
    });
    return response.data;
  },

  /**
   * Request password reset email
   * @param {string} email 
   */
  forgotPassword: async (email) => {
    const response = await apiClient.post('/api/auth/forgot-password', {
      email,
    });
    return response.data;
  },
};
