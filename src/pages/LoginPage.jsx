import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

/**
 * Login Page Component
 * 
 * This is your first complete React page!
 * It handles user login with email and password
 */
export default function LoginPage() {
  // Local state for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Local state for validation errors
  const [errors, setErrors] = useState({});
  
  // Get login function and state from Zustand store
  const { login, loading, error: authError } = useAuthStore();

  /**
   * Validate form inputs
   * Returns true if valid, false otherwise
   */
  const validateForm = () => {
    const newErrors = {};
    
    // Validate email
    if (!email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email inválido';
    }
    
    // Validate password
    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    
    console.log('📝 Form submitted with:', { 
      email, 
      password: '***' // Don't log actual password
    });
    
    // Validate before submitting
    if (!validateForm()) {
      console.log('❌ Validation failed');
      return;
    }

    console.log('✅ Validation passed, calling API...');

    try {
      // Call login function from store
      const result = await login(email, password);
      
      console.log('🎉 Login successful!', result);
      alert('¡Login exitoso! Bienvenido');
    } catch (error) {
      console.error('💥 Login failed:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      // Error is handled by the store and shown below
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      {/* Container - keeps content centered and not too wide */}
      <div className="max-w-md w-full">
        
        {/* Header with logo and title */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">⚽</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Soccer League
          </h1>
          <p className="text-gray-600">
            Inicia sesión para gestionar tu liga
          </p>
        </div>
        
        {/* Login Form Card */}
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Show error from backend if login failed */}
            {authError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <p className="text-sm">{authError}</p>
              </div>
            )}
            
            {/* Email Input */}
            <Input
              label="Email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />
            
            {/* Password Input */}
            <Input
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />
            
            {/* Forgot Password Link */}
            <div className="text-right">
              <a 
                href="#forgot-password" 
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            
            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              className="w-full"
            >
              Iniciar Sesión
            </Button>
            
          </form>
          
          {/* Register Link */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              ¿No tienes cuenta?{' '}
              <a 
                href="#register" 
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
              >
                Regístrate aquí
              </a>
            </p>
          </div>
        </Card>
        
        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-8">
          © 2024 Soccer League Management System
        </p>
        
      </div>
    </div>
  );
}
