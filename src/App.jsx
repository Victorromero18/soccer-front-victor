import { useState, useEffect } from 'react'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import TestBackendConnection from './pages/TestBackendConnection'

/**
 * Main App Component
 * 
 * Simple routing based on URL hash
 * Later, we'll add React Router for proper navigation
 */
function App() {
  const [currentPage, setCurrentPage] = useState('login');

  // Listen to URL hash changes for simple routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the #
      if (hash) {
        setCurrentPage(hash);
      }
    };

    // Set initial page from URL
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Uncomment this line to test backend connection:
  // return <TestBackendConnection />

  // Simple routing
  if (currentPage === 'register') {
    return <RegisterPage />;
  }

  return <LoginPage />;
}

export default App
