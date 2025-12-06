import { create } from 'zustand';
import { authService } from '../api/authService';

/**
 * Zustand Store for Authentication
 * This manages the global auth state across your entire app
 * 
 * Think of it as a global variable that all components can access
 */
export const useAuthStore = create((set) => ({
  // State
  user: authService.getCurrentUser(), // Get user from localStorage on app start
  isAuthenticated: !!authService.getCurrentUser(), // true if user exists
  loading: false, // true when API call is in progress
  error: null, // stores error messages

  /**
   * Login action
   */
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const data = await authService.login(email, password);
      set({ 
        user: data, 
        isAuthenticated: true, 
        loading: false 
      });
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al iniciar sesión';
      set({ 
        error: errorMessage,
        loading: false 
      });
      throw error;
    }
  },

  /**
   * Logout action
   */
  logout: () => {
    authService.logout();
    set({ user: null, isAuthenticated: false, error: null });
  },

  /**
   * Clear error message
   */
  clearError: () => set({ error: null }),
}));
