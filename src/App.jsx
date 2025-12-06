import LoginPage from './pages/LoginPage'
import TestBackendConnection from './pages/TestBackendConnection'

/**
 * Main App Component
 * 
 * This is the root component of your application
 * For now, it just shows the LoginPage
 * Later, we'll add React Router for navigation
 */
function App() {
  // Uncomment this line to test backend connection:
  // return <TestBackendConnection />
  
  return <LoginPage />
}

export default App
