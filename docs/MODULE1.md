
## 🎯 Resumen del Backend Existente (Módulo 1 - IAM)

### ✅ Endpoints Implementados

| Endpoint | Método | Auth | Descripción |
|----------|--------|------|-------------|
| `/api/auth/register/superadmin` | POST | No | Registrar SuperAdmin con nombre de liga |
| `/api/auth/verify?token={token}` | GET | No | Verificar email con token |
| `/api/auth/login` | POST | No | Login (devuelve JWT) |
| `/api/auth/forgot-password` | POST | No | Solicitar reset de contraseña |
| `/api/auth/reset-password` | POST | No | Resetear contraseña con token |
| `/api/auth/create-user` | POST | JWT | Crear nuevos usuarios (roles: Organizador, Delegado, Público) |

You can see the GitHub repository of the backend here: https://github.com/alberrtor/soccer-backend for more details.
Or you can see the repositoy in my local machine here: /Users/alberrtor/projects/soccer-backend (../soccer-backend)

### 🔐 Roles del Sistema

1. **SuperAdmin** (rolId: 1) - Administrador principal de la liga
2. **Organizador** (rolId: 2) - Gestiona torneos
3. **Delegado** (rolId: 3) - Gestiona equipo
4. **Público** (rolId: 4) - Solo lectura

### 📡 Respuesta del Login (JWT)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "userId": 1,
  "email": "admin@liga.com",
  "rolNombre": "SuperAdmin",
  "rolId": 1,
  "nombreLiga": "Mi Liga de Fútbol"
}
```

### 🔒 Seguridad Backend

- ✅ JWT expira en 24 horas
- ✅ CORS configurado para `http://localhost:3000` (React dev server)
- ✅ Contraseñas hasheadas con BCrypt
- ✅ Tokens de verificación con expiración

---

## 🗂️ Estructura de los Proyectos están separados
ß
**Estructura:**
```
/Users/alberrtor/projects/
├── soccer-backend/          ← Proyecto Backend (Java/Spring Boot)
│   ├── src/
│   ├── build.gradle
│   └── ...
└── soccer-frontend/         ← Proyecto Frontend (React)
    ├── src/
    ├── package.json
    └── ...
```

**Ventajas:**
- ✅ **Despliegue independiente** - Frontend en Vercel/Netlify, Backend en Render
- ✅ **Repositorios separados** - Control de versiones más limpio
- ✅ **Desarrollo más rápido** - No interfieren los builds
- ✅ **Equipos separados** - Backend y Frontend pueden trabajar independientemente
- ✅ **CI/CD más simple** - Pipelines independientes

**Desventajas:**
- ❌ Dos repositorios Git
- ❌ Configuración de CORS más explícita


## 🚀 Cómo Crear el Proyecto React (Paso a Paso)

### 1. Crear el Proyecto

```bash
# Navega a la carpeta de proyectos
cd /Users/alberrtor/projects/

# Crea el proyecto React con Vite (más rápido que Create React App)
npm create vite@latest soccer-frontend -- --template react

# O si prefieres TypeScript (RECOMENDADO para proyectos grandes)
npm create vite@latest soccer-frontend -- --template react-ts

# Entra al directorio
cd soccer-frontend

# Instala dependencias
npm install
```

### 2. Instalar Dependencias Esenciales

```bash
# Routing
npm install react-router-dom

# HTTP Client
npm install axios

# State Management (opcional, pero recomendado)
npm install zustand
# O si prefieres Redux Toolkit
# npm install @reduxjs/toolkit react-redux

# UI Framework - TailwindCSS + shadcn/ui (como especifica tu proyecto)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p  #Este comando no fue necesario

# shadcn/ui components (instalar según necesites)
npx shadcn-ui@latest init

# Form handling y validación
npm install react-hook-form zod @hookform/resolvers

# Icons
npm install lucide-react

# Date handling
npm install date-fns

# Toast notifications
npm install sonner
```

### 3. Inicializar Git

```bash
git init
git add .
git commit -m "Initial React project setup"

# Crear repositorio en GitHub y conectar
git remote add origin https://github.com/tu-usuario/soccer-frontend.git
git push -u origin main
```

---

## 🏗️ Estructura de Carpetas Recomendada

```
soccer-frontend/
├── public/
│   └── favicon.ico
├── src/
│   ├── api/                    # Servicios API
│   │   ├── axiosConfig.js      # Configuración de Axios
│   │   ├── authService.js      # Servicios de autenticación
│   │   └── endpoints.js        # Constantes de endpoints
│   │
│   ├── assets/                 # Imágenes, fonts, etc.
│   │   ├── images/
│   │   └── icons/
│   │
│   ├── components/             # Componentes reutilizables
│   │   ├── common/             # Botones, Inputs, Cards, etc.
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   └── Card.jsx
│   │   ├── layout/             # Layout components
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Footer.jsx
│   │   └── auth/               # Componentes específicos de auth
│   │       ├── LoginForm.jsx
│   │       ├── RegisterForm.jsx
│   │       └── ProtectedRoute.jsx
│   │
│   ├── pages/                  # Páginas/Vistas
│   │   ├── auth/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── VerifyEmailPage.jsx
│   │   │   ├── ForgotPasswordPage.jsx
│   │   │   └── ResetPasswordPage.jsx
│   │   ├── dashboard/
│   │   │   ├── DashboardPage.jsx
│   │   │   └── SuperAdminDashboard.jsx
│   │   └── NotFoundPage.jsx
│   │
│   ├── hooks/                  # Custom hooks
│   │   ├── useAuth.js
│   │   └── useApi.js
│   │
│   ├── store/                  # State management (Zustand/Redux)
│   │   ├── authStore.js
│   │   └── userStore.js
│   │
│   ├── utils/                  # Utilidades
│   │   ├── constants.js
│   │   ├── validators.js
│   │   └── helpers.js
│   │
│   ├── styles/                 # Estilos globales
│   │   └── globals.css
│   │
│   ├── App.jsx                 # Componente principal
│   ├── main.jsx                # Entry point
│   └── router.jsx              # Configuración de rutas
│
├── .env.development            # Variables de entorno (dev)
├── .env.production             # Variables de entorno (prod)
├── .gitignore
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🔧 Configuraciones Importantes

### 1. Variables de Entorno

**`.env.development`**
```env
VITE_API_BASE_URL=http://localhost:8080
VITE_API_TIMEOUT=10000
```

**`.env.production`**
```env
VITE_API_BASE_URL=https://your-app.onrender.com
VITE_API_TIMEOUT=10000
```

### 2. Configuración de Axios

**`src/api/axiosConfig.js`**
```javascript
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Crear instancia de Axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar JWT a todas las peticiones
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

### 3. Servicio de Autenticación

**`src/api/authService.js`**
```javascript
import apiClient from './axiosConfig';

export const authService = {
  // Registrar SuperAdmin
  registerSuperAdmin: async (email, password, nombreLiga) => {
    const response = await apiClient.post('/api/auth/register/superadmin', {
      email,
      password,
      nombreLiga,
    });
    return response.data;
  },

  // Verificar email
  verifyEmail: async (token) => {
    const response = await apiClient.get(`/api/auth/verify?token=${token}`);
    return response.data;
  },

  // Login
  login: async (email, password) => {
    const response = await apiClient.post('/api/auth/login', {
      email,
      password,
    });
    // Guardar token y user en localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Obtener usuario actual
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Forgot password
  forgotPassword: async (email) => {
    const response = await apiClient.post('/api/auth/forgot-password', {
      email,
    });
    return response.data;
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    const response = await apiClient.post('/api/auth/reset-password', {
      token,
      newPassword,
    });
    return response.data;
  },

  // Create user (requiere JWT)
  createUser: async (email, password, rolId) => {
    const response = await apiClient.post('/api/auth/create-user', {
      email,
      password,
      rolId,
    });
    return response.data;
  },
};
```

### 4. Store de Autenticación (Zustand)

**`src/store/authStore.js`**
```javascript
import { create } from 'zustand';
import { authService } from '../api/authService';

export const useAuthStore = create((set) => ({
  user: authService.getCurrentUser(),
  isAuthenticated: !!authService.getCurrentUser(),
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const data = await authService.login(email, password);
      set({ user: data, isAuthenticated: true, loading: false });
      return data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Error al iniciar sesión',
        loading: false 
      });
      throw error;
    }
  },

  logout: () => {
    authService.logout();
    set({ user: null, isAuthenticated: false });
  },

  clearError: () => set({ error: null }),
}));
```

### 5. Protected Route Component

**`src/components/auth/ProtectedRoute.jsx`**
```jsx
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.rolNombre)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};
```

### 6. Router Configuration

**`src/router.jsx`**
```jsx
import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import VerifyEmailPage from './pages/auth/VerifyEmailPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';

export const router = createBrowserRouter([
  // Public routes
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/verify-email',
    element: <VerifyEmailPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage />,
  },
  
  // Protected routes
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  
  // 404
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
```

---

## 📱 Páginas del Módulo 1 a Implementar

### 1. **Login Page** (`/login`)
- ✅ Form con email y password
- ✅ Validación con react-hook-form + zod
- ✅ Mostrar errores del backend
- ✅ Redirección según rol después del login
- ✅ Link a "Olvidé mi contraseña"
- ✅ Link a "Registrarse" (si es primer usuario)

### 2. **Register Page** (`/register`)
- ✅ Form para registrar SuperAdmin
- ✅ Campos: email, password, nombreLiga
- ✅ Confirmación de contraseña
- ✅ Validación de contraseña segura
- ✅ Mensaje de éxito con instrucciones de verificación

### 3. **Verify Email Page** (`/verify-email?token=...`)
- ✅ Extraer token de URL
- ✅ Llamar endpoint de verificación automáticamente
- ✅ Mostrar spinner mientras verifica
- ✅ Mensaje de éxito o error
- ✅ Redirección a login

### 4. **Forgot Password Page** (`/forgot-password`)
- ✅ Form con email
- ✅ Enviar request de reset
- ✅ Mensaje de confirmación

### 5. **Reset Password Page** (`/reset-password?token=...`)
- ✅ Extraer token de URL
- ✅ Form con nueva contraseña y confirmación
- ✅ Validación de contraseña
- ✅ Redirección a login después de éxito

### 6. **Dashboard Page** (`/dashboard`)
- ✅ Contenido diferente según rol:
  - **SuperAdmin**: Gestionar usuarios, ver todas las ligas
  - **Organizador**: Gestionar torneos
  - **Delegado**: Gestionar equipo
  - **Público**: Ver información

### 7. **Create User Modal/Page** (Solo SuperAdmin/Organizador)
- ✅ Form para crear usuarios
- ✅ Seleccionar rol (dropdown)
- ✅ Email y password
- ✅ Validación

---

## 🎨 Guía Completa de Diseño UI/UX para Principiantes

### 🎯 No Te Preocupes por el Diseño

**Buenas noticias:** No necesitas ser diseñador para crear una interfaz atractiva y funcional. Con las herramientas modernas, puedes lograr un diseño profesional siguiendo patrones establecidos.

---

### 🛠️ Frameworks Recomendados (Tu Mejor Amigo)

#### 1. **TailwindCSS** - CSS sin escribir CSS
- ✅ Clases utilitarias pre-diseñadas (`bg-blue-500`, `p-4`, `rounded-lg`)
- ✅ No necesitas pensar en nombres de clases
- ✅ Responsive design integrado
- ✅ Consistencia automática

**Ejemplo simple:**
```jsx
<button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg">
  Iniciar Sesión
</button>
```

#### 2. **shadcn/ui** - Componentes Pre-diseñados
- ✅ Botones, inputs, cards, modals ya diseñados
- ✅ Solo copiar y pegar
- ✅ Accesibles por defecto
- ✅ Personalizables

**Cómo usar:**
```bash
# Instalar un componente
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add card
```

#### 3. **Lucide React** - Iconos Profesionales
- ✅ Miles de iconos listos para usar
- ✅ Consistentes y modernos

```jsx
import { Mail, Lock, User } from 'lucide-react';

<Mail className="w-5 h-5" />
```

#### 4. **Sonner** - Notificaciones Bonitas
```jsx
import { toast } from 'sonner';

toast.success('¡Login exitoso!');
toast.error('Credenciales inválidas');
```

---

### 🎨 Paleta de Colores - Tema Fútbol

**No inventes colores, usa estos:**

```css
/* Colores principales */
--primary: #10b981;       /* Verde césped - Acciones principales */
--secondary: #3b82f6;     /* Azul - Enlaces y secundarios */
--accent: #f59e0b;        /* Amarillo/Oro - Destacados */
--danger: #ef4444;        /* Rojo - Errores y eliminar */
--success: #10b981;       /* Verde - Éxito */
--warning: #f59e0b;       /* Amarillo - Advertencias */

/* Neutrales */
--dark: #1f2937;          /* Textos principales */
--gray: #6b7280;          /* Textos secundarios */
--light-gray: #f3f4f6;    /* Fondos */
--white: #ffffff;         /* Fondo principal */
```

**En TailwindCSS:**
- Verde: `bg-green-500`, `text-green-600`, `border-green-400`
- Azul: `bg-blue-500`, `text-blue-600`
- Rojo: `bg-red-500`, `text-red-600`

---

### 📐 Reglas de Espaciado (Muy Importante)

**Usa múltiplos de 4px (en Tailwind es automático):**

```jsx
{/* ❌ MAL: Espaciados inconsistentes */}
<div className="p-3 m-7">...</div>

{/* ✅ BIEN: Usa la escala de Tailwind */}
<div className="p-4 m-8">...</div>
{/* p-4 = 16px (padding) */}
{/* m-8 = 32px (margin) */}
```

**Escala recomendada:**
- Pequeño: `p-2` (8px), `p-4` (16px)
- Medio: `p-6` (24px), `p-8` (32px)
- Grande: `p-10` (40px), `p-12` (48px)

---

### 📱 Responsive Design - Mobile First

**Siempre diseña primero para móvil, luego para desktop:**

```jsx
{/* Se ve bien en móvil y crece en pantallas grandes */}
<div className="
  p-4              // Padding pequeño en móvil
  md:p-8           // Padding medio en tablets (768px+)
  lg:p-12          // Padding grande en desktop (1024px+)
  
  grid
  grid-cols-1      // 1 columna en móvil
  md:grid-cols-2   // 2 columnas en tablets
  lg:grid-cols-3   // 3 columnas en desktop
">
  {/* Contenido */}
</div>
```

**Breakpoints de TailwindCSS:**
- `sm:` → 640px (móvil grande)
- `md:` → 768px (tablets)
- `lg:` → 1024px (laptop)
- `xl:` → 1280px (desktop)

---

### 🎯 Principios de UX Esenciales

#### 1. **Feedback Visual Inmediato**

Siempre que el usuario haga algo, muéstrale que algo pasó:

```jsx
// ✅ BIEN: El usuario sabe que está pasando algo
const [loading, setLoading] = useState(false);

<button 
  onClick={handleLogin}
  disabled={loading}
  className="bg-green-500 disabled:bg-gray-400"
>
  {loading ? 'Cargando...' : 'Iniciar Sesión'}
</button>
```

#### 2. **Estados de la UI**

Tu interfaz debe manejar 4 estados:

```jsx
// 1. Estado inicial (idle)
<div>Listo para usar</div>

// 2. Estado cargando (loading)
<div>
  <Spinner />
  <p>Cargando datos...</p>
</div>

// 3. Estado de éxito (success)
<div className="text-green-600">
  ✓ Login exitoso
</div>

// 4. Estado de error (error)
<div className="text-red-600">
  ✗ Error: Credenciales inválidas
</div>
```

#### 3. **Validación de Formularios Clara**

```jsx
{/* ✅ Muestra el error debajo del input */}
<div>
  <label>Email</label>
  <input 
    type="email" 
    className={errors.email ? 'border-red-500' : 'border-gray-300'}
  />
  {errors.email && (
    <p className="text-red-500 text-sm mt-1">
      {errors.email.message}
    </p>
  )}
</div>
```

#### 4. **Hover y Focus States**

Siempre indica cuando algo es interactivo:

```jsx
<button className="
  bg-green-500 
  hover:bg-green-600      // Cambio al pasar el mouse
  focus:ring-2            // Anillo al hacer click
  focus:ring-green-300    // Color del anillo
  transition              // Animación suave
">
  Click me
</button>
```

---

### 📋 Layout Pattern - Login Page Ejemplo

**Copia este patrón para tus páginas de auth:**

```jsx
function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Container centrado */}
      <div className="max-w-md w-full">
        
        {/* Logo y título */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            ⚽ Mi Liga de Fútbol
          </h1>
          <p className="text-gray-600 mt-2">
            Inicia sesión para continuar
          </p>
        </div>
        
        {/* Card con el formulario */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <form className="space-y-6">
            
            {/* Input de email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="tu@email.com"
              />
            </div>
            
            {/* Input de password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
            
            {/* Link olvidé contraseña */}
            <div className="text-right">
              <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            
            {/* Botón submit */}
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white 
                         py-3 rounded-lg font-medium transition"
            >
              Iniciar Sesión
            </button>
            
          </form>
          
          {/* Link a registro */}
          <p className="text-center text-sm text-gray-600 mt-6">
            ¿No tienes cuenta?{' '}
            <a href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
              Regístrate aquí
            </a>
          </p>
        </div>
        
      </div>
    </div>
  );
}
```

---

### 🎨 Componentes Comunes - Templates

#### Input Component
```jsx
// src/components/common/Input.jsx
export function Input({ label, error, ...props }) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-2 rounded-lg border
          ${error ? 'border-red-500' : 'border-gray-300'}
          focus:ring-2 focus:ring-green-500 focus:border-transparent
          transition
        `}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}
```

#### Button Component
```jsx
// src/components/common/Button.jsx
export function Button({ children, variant = 'primary', loading, ...props }) {
  const variants = {
    primary: 'bg-green-500 hover:bg-green-600 text-white',
    secondary: 'bg-blue-500 hover:bg-blue-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    outline: 'border-2 border-gray-300 hover:bg-gray-50 text-gray-700'
  };
  
  return (
    <button
      className={`
        ${variants[variant]}
        px-6 py-3 rounded-lg font-medium
        disabled:opacity-50 disabled:cursor-not-allowed
        transition
      `}
      disabled={loading}
      {...props}
    >
      {loading ? 'Cargando...' : children}
    </button>
  );
}
```

#### Card Component
```jsx
// src/components/common/Card.jsx
export function Card({ children, title, className = '' }) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {title && (
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
```

---

### 🎯 Inspiración de Diseño

**Sitios para copiar diseños (es legal y recomendado):**

1. **Dribbble** - https://dribbble.com/search/dashboard
   - Busca: "admin dashboard", "login form", "sports app"
   
2. **TailwindUI** - https://tailwindui.com/components
   - Componentes oficiales de Tailwind (algunos gratis)
   
3. **shadcn/ui Examples** - https://ui.shadcn.com/examples
   - Páginas completas ya diseñadas
   
4. **Flowbite** - https://flowbite.com/docs/getting-started/introduction/
   - Componentes gratuitos con Tailwind

**Cómo usar inspiración:**
1. Encuentra un diseño que te guste
2. Identifica los componentes (header, card, button, etc.)
3. Recrea con TailwindCSS
4. Ajusta colores a tu paleta

---

### ✅ Checklist de Diseño para Cada Página

Antes de considerar una página "terminada", verifica:

- [ ] **Responsive** - Se ve bien en móvil, tablet y desktop
- [ ] **Loading states** - Muestra spinner o "Cargando..." cuando espera
- [ ] **Error states** - Muestra mensajes de error claros
- [ ] **Success feedback** - Confirmación visual de acciones exitosas
- [ ] **Hover effects** - Botones y links cambian al pasar el mouse
- [ ] **Focus visible** - Se ve cuando algo está seleccionado (tab navigation)
- [ ] **Espaciado consistente** - Usa múltiplos de 4 (p-4, p-8, etc.)
- [ ] **Colores consistentes** - Usa tu paleta definida
- [ ] **Tipografía clara** - Títulos grandes, texto legible

---

### 🚀 Plan de Diseño para Principiantes

#### Semana 1: Aprende los Básicos
1. **Día 1-2**: Tutorial de TailwindCSS (2 horas)
   - https://tailwindcss.com/docs/utility-first
   
2. **Día 3-4**: Instala shadcn/ui y prueba componentes (2 horas)
   - `npx shadcn-ui@latest add button input card`
   
3. **Día 5-7**: Crea tu LoginPage siguiendo el template de arriba

#### Semana 2: Practica
1. Crea todas las páginas de auth usando el mismo patrón
2. Copia y pega componentes de shadcn/ui
3. Ajusta colores con tu paleta

**Recuerda:** No necesitas ser original en el diseño. Los mejores diseñadores copian y adaptan patrones existentes.

---

### 💡 Tips de Oro

1. **Copia diseños existentes** - No reinventes la rueda
2. **Usa shadcn/ui para todo** - Ya está diseñado y funcional
3. **Mantén consistencia** - Mismos espacios, colores y estilos en toda la app
4. **Mobile first** - Diseña primero para móvil
5. **Menos es más** - No agregues elementos innecesarios
6. **Prueba en diferentes dispositivos** - Chrome DevTools tiene simulador móvil

---

### 🎨 Herramientas Útiles

1. **Tailwind Play** - https://play.tailwindcss.com/
   - Prueba Tailwind sin instalar nada
   
2. **ColorHunt** - https://colorhunt.co/
   - Paletas de colores predefinidas
   
3. **Google Fonts** - https://fonts.google.com/
   - Tipografías gratuitas (Recomendado: Inter, Poppins, Roboto)
   
4. **React Icons** - https://react-icons.github.io/react-icons/
   - Alternativa a Lucide con más opciones

---

## ✅ Best Practices para React

### 1. Estructura de Componentes

```jsx
// ❌ MAL: Todo en un componente
function LoginPage() {
  // 500 líneas de código
}

// ✅ BIEN: Dividir en componentes pequeños
function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
```

### 2. Custom Hooks para Lógica Reutilizable

```jsx
// hooks/useAuth.js
export const useAuth = () => {
  const { user, login, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      // Handle error
    }
  };

  return { user, handleLogin, logout };
};
```

### 3. Error Handling Consistente

```jsx
import { toast } from 'sonner';

try {
  await authService.login(email, password);
  toast.success('¡Bienvenido!');
} catch (error) {
  const message = error.response?.data?.message || 'Error inesperado';
  toast.error(message);
}
```

### 4. Loading States

```jsx
const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async (data) => {
  setIsLoading(true);
  try {
    await authService.register(data);
  } finally {
    setIsLoading(false);
  }
};

return (
  <Button disabled={isLoading}>
    {isLoading ? 'Cargando...' : 'Registrarse'}
  </Button>
);
```

### 5. Form Validation con Zod

```jsx
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
});

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
    </form>
  );
}
```

### 6. Environment Variables

```jsx
// ❌ MAL: Hardcodear URLs
const API_URL = 'http://localhost:8080';

// ✅ BIEN: Usar variables de entorno
const API_URL = import.meta.env.VITE_API_BASE_URL;
```

### 7. Code Splitting

```jsx
import { lazy, Suspense } from 'react';

// Lazy load pages
const DashboardPage = lazy(() => import('./pages/DashboardPage'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <DashboardPage />
    </Suspense>
  );
}
```

---

## 🧪 Testing (Opcional pero Recomendado)

### Herramientas

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
npm install -D @testing-library/user-event
```

### Ejemplo de Test

```jsx
import { render, screen } from '@testing-library/react';
import { LoginForm } from './LoginForm';

test('renders login form', () => {
  render(<LoginForm />);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});
```

---

## 🚀 Deployment

### Vercel (Recomendado para React)

1. **Conectar repositorio GitHub**
   - https://vercel.com/new
   - Importar proyecto desde GitHub

2. **Configurar variables de entorno**
   ```
   VITE_API_BASE_URL=https://your-backend.onrender.com
   ```

3. **Deploy automático**
   - Cada push a `main` despliega automáticamente

### Netlify (Alternativa)

Similar a Vercel, con configuración automática.

### Build Command

```json
// package.json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## 📝 Checklist de Implementación

### Setup Inicial
- [ ] Crear proyecto con Vite
- [ ] Instalar dependencias (React Router, Axios, Zustand, TailwindCSS, shadcn/ui)
- [ ] Configurar TailwindCSS
- [ ] Configurar shadcn/ui
- [ ] Crear estructura de carpetas
- [ ] Configurar variables de entorno
- [ ] Configurar Axios con interceptors

### Componentes Core
- [ ] Configurar React Router
- [ ] Crear AuthLayout
- [ ] Crear ProtectedRoute
- [ ] Crear componentes comunes (Button, Input, Card)
- [ ] Configurar Zustand store

### Páginas del Módulo 1
- [ ] LoginPage
- [ ] RegisterPage (SuperAdmin)
- [ ] VerifyEmailPage
- [ ] ForgotPasswordPage
- [ ] ResetPasswordPage
- [ ] DashboardPage
- [ ] CreateUserModal/Page

### Integración con Backend
- [ ] Probar registro
- [ ] Probar login
- [ ] Probar JWT en peticiones protegidas
- [ ] Probar refresh de página (mantener sesión)
- [ ] Probar logout
- [ ] Probar manejo de errores

### UI/UX
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Loading states
- [ ] Error handling con toasts
- [ ] Form validations
- [ ] Accesibilidad básica

### Deploy
- [ ] Build de producción
- [ ] Deploy en Vercel/Netlify
- [ ] Configurar variables de entorno en producción
- [ ] Probar en producción

---

## 🎓 Recursos de Aprendizaje React

### Documentación Oficial
- React: https://react.dev
- Vite: https://vitejs.dev
- React Router: https://reactrouter.com
- TailwindCSS: https://tailwindcss.com
- shadcn/ui: https://ui.shadcn.com

### Tutoriales Recomendados
1. **React Basics**: https://react.dev/learn
2. **React Router Tutorial**: https://reactrouter.com/en/main/start/tutorial
3. **TailwindCSS Setup**: https://tailwindcss.com/docs/guides/vite
4. **Axios Best Practices**: https://axios-http.com/docs/interceptors

### Videos YouTube (Español)
- "React desde cero" - midudev
- "React Router v6" - Fazt
- "TailwindCSS Crash Course" - Bluuweb

---

## 🔄 Flujo de Trabajo Sugerido

### Día 1: Setup
1. Crear proyecto React con Vite
2. Instalar todas las dependencias
3. Configurar TailwindCSS y shadcn/ui
4. Crear estructura de carpetas
5. Configurar Axios y variables de entorno

### Día 2-3: Auth Components
1. Crear LoginForm
2. Crear RegisterForm
3. Configurar Zustand store
4. Implementar ProtectedRoute
5. Probar login y registro

### Día 4: Password Recovery
1. Crear ForgotPasswordPage
2. Crear ResetPasswordPage
3. Crear VerifyEmailPage

### Día 5: Dashboard y User Management
1. Crear DashboardPage básico
2. Crear componente para crear usuarios
3. Implementar navegación según roles

### Día 6: Polish y Testing
1. Responsive design
2. Error handling
3. Loading states
4. Testing básico

### Día 7: Deploy
1. Build de producción
2. Deploy en Vercel
3. Configurar variables de entorno
4. Testing en producción

---

## 🚨 Errores Comunes a Evitar

### 1. CORS Issues
**Problema:** Backend rechaza peticiones del frontend

**Solución:** El backend ya está configurado para `localhost:3000`

### 2. JWT Expirado
**Problema:** Usuario pierde sesión de repente

**Solución:** Implementado en interceptor de Axios (redirige a login)

### 3. Hardcodear URLs
**Problema:** URL del backend cambia en producción

**Solución:** Usar variables de entorno

### 4. No manejar Loading States
**Problema:** Usuario hace doble-click y envía request dos veces

**Solución:** Deshabilitar botón durante loading

### 5. Contraseñas en localStorage
**Problema:** Seguridad

**Solución:** NUNCA guardar contraseñas, solo JWT token

### 6. No validar Forms
**Problema:** Enviar datos inválidos al backend

**Solución:** Usar Zod + react-hook-form

---

## 💡 Próximos Módulos (Después del Módulo 1)

Una vez completado el Módulo 1 (IAM), el siguiente paso será:

### Módulo 2: Gestión de Torneos
- Crear torneo
- Editar torneo
- Configurar formato (Liga, Eliminatoria, Grupos)
- Subir logo y reglamento
- Gestionar inscripciones

### Módulo 3: Gestión de Equipos
- Registrar equipos
- Gestionar plantilla de jugadores
- Subir fotos de jugadores

### Módulo 4: Calendario y Partidos
- Generar calendario automático
- Asignar fechas y horarios
- Gestión de canchas/sedes

### Módulo 5: Resultados en Vivo
- Registrar goles
- Registrar tarjetas
- Actualizar tablas en tiempo real

---

## 📞 Siguientes Pasos

1. **Crear el proyecto React**
   ```bash
   cd /Users/alberrtor/projects/
   npm create vite@latest soccer-frontend -- --template react-ts
   cd soccer-frontend
   npm install
   ```

2. **Instalar dependencias**
   ```bash
   npm install react-router-dom axios zustand
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   npm install react-hook-form zod @hookform/resolvers
   npm install lucide-react sonner
   ```

3. **Configurar shadcn/ui**
   ```bash
   npx shadcn-ui@latest init
   ```

4. **Crear estructura de carpetas** (según la guía de arriba)

5. **Implementar LoginPage primero** (es la página más importante)

6. **Probar integración con backend**

---

## 🎯 Conclusión

**Respuestas a tus preguntas:**

1. ✅ **¿React o Angular?** → React (como está en tu spec)
2. ✅ **¿Separado o mismo directorio?** → **Proyectos separados** (más profesional)
3. ✅ **Best practices?** → Ver toda esta guía

**Lo más importante:**
- Estructura de carpetas clara
- Separación de responsabilidades (componentes, servicios, stores)
- Manejo de errores consistente
- Variables de entorno
- Código limpio y mantenible

**Este documento será tu guía de referencia durante todo el desarrollo del frontend.**

---

**Versión:** 1.0  
**Fecha:** Diciembre 2024  
**Autor:** Análisis técnico para proyecto Soccer Tournament Management System
