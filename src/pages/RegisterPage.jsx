import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

/**
 * Register Page Component - SuperAdmin Registration
 * 
 * This page allows the first user to register as SuperAdmin
 * and create their league
 */
export default function RegisterPage() {
  // Local state for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [leagueName, setLeagueName] = useState('');
  
  // Local state for validation errors
  const [errors, setErrors] = useState({});
  
  // Local state for success message
  const [success, setSuccess] = useState(false);
  
  // Get register function and state from Zustand store
  const { register: registerUser, loading, error: authError } = useAuthStore();

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
    } else if (password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password = 'Debe contener mayúsculas, minúsculas y números';
    }
    
    // Validate confirm password
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    // Validate league name
    if (!leagueName) {
      newErrors.leagueName = 'El nombre de la liga es requerido';
    } else if (leagueName.length < 3) {
      newErrors.leagueName = 'Debe tener al menos 3 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('📝 Register form submitted');
    
    // Validate before submitting
    if (!validateForm()) {
      console.log('❌ Validation failed');
      return;
    }

    console.log('✅ Validation passed, calling API...');

    try {
      // Call register function from store
      await registerUser(email, password, leagueName);
      
      console.log('🎉 Registration successful!');
      
      // Show success message
      setSuccess(true);
      
      // Clear form
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setLeagueName('');
      
    } catch (error) {
      console.error('💥 Registration failed:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      {/* Container */}
      <div className="max-w-md w-full">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">⚽</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Crear Liga
          </h1>
          <p className="text-gray-600">
            Regístrate como SuperAdmin y crea tu liga
          </p>
        </div>
        
        {/* Register Form Card */}
        <Card>
          {/* Success Message */}
          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              <p className="font-bold">✅ ¡Registro exitoso!</p>
              <p className="text-sm mt-1">
                Revisa tu email para verificar tu cuenta antes de iniciar sesión.
              </p>
              <a 
                href="#login" 
                className="text-sm text-green-600 hover:text-green-700 font-medium underline mt-2 inline-block"
              >
                Ir al Login →
              </a>
            </div>
          )}

          {!success && (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Show error from backend if registration failed */}
              {authError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  <p className="text-sm">{authError}</p>
                </div>
              )}
              
              {/* League Name Input */}
              <Input
                label="Nombre de tu Liga"
                type="text"
                placeholder="Ej: Liga Deportiva Municipal"
                value={leagueName}
                onChange={(e) => setLeagueName(e.target.value)}
                error={errors.leagueName}
              />
              
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
              
              {/* Confirm Password Input */}
              <Input
                label="Confirmar Contraseña"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
              />
              
              {/* Password Requirements */}
              <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                <p className="text-xs text-blue-800 font-medium mb-1">
                  Requisitos de contraseña:
                </p>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• Mínimo 8 caracteres</li>
                  <li>• Al menos una mayúscula y una minúscula</li>
                  <li>• Al menos un número</li>
                </ul>
              </div>
              
              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                loading={loading}
                className="w-full"
              >
                Crear Liga y Registrarse
              </Button>
              
            </form>
          )}
          
          {/* Login Link */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <a 
                href="#login" 
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
              >
                Inicia sesión aquí
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
