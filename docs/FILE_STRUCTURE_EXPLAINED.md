# 📂 File Structure Explained - Complete Guide

## Overview

This document explains **every file** in your React project, how they work together, and why they exist.

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Configuration Files](#configuration-files)
3. [Source Code Files](#source-code)
4. [How Data Flows](#data-flow)
5. [How Components Connect](#component-connections)

---

## Project Structure {#project-structure}

```
soccer-frontend/
├── .env.development          ← Environment variables (API URL)
├── jsconfig.json            ← JavaScript configuration
├── vite.config.js           ← Vite bundler configuration
├── package.json             ← Project dependencies
├── index.html               ← Entry HTML file
│
├── docs/                    ← Documentation (you are here!)
│   ├── MODULE1.md
│   ├── DESIGN_GUIDE.md
│   └── FILE_STRUCTURE_EXPLAINED.md
│
├── public/                  ← Static assets
│
└── src/                     ← Source code (your app lives here!)
    ├── main.jsx            ← App entry point
    ├── App.jsx             ← Root component
    ├── index.css           ← Global styles (Tailwind)
    │
    ├── api/                ← API communication
    │   ├── axiosConfig.js
    │   └── authService.js
    │
    ├── store/              ← Global state management
    │   └── authStore.js
    │
    ├── components/         ← Reusable UI components
    │   └── ui/
    │       ├── Button.jsx
    │       ├── Input.jsx
    │       └── Card.jsx
    │
    └── pages/              ← Page components
        └── LoginPage.jsx
```

---

## Configuration Files {#configuration-files}

### 1. `.env.development`

**Purpose:** Store environment-specific variables (like API URLs)

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_API_TIMEOUT=10000
```

**Why it exists:**
- Different URLs for development vs production
- Never hardcode URLs in your code
- Vite requires `VITE_` prefix for variables

**How to use in code:**
```javascript
const API_URL = import.meta.env.VITE_API_BASE_URL;
```

**Important:**
- ❌ Never commit `.env.local` (contains secrets)
- ✅ `.env.development` is safe (no secrets)
- Create `.env.production` for production URL

---

### 2. `jsconfig.json`

**Purpose:** Configure JavaScript project settings

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**What this enables:**

**Instead of:**
```javascript
import Button from '../../../components/ui/Button';
```

**You can write:**
```javascript
import Button from '@/components/ui/Button';
```

**Benefits:**
- Cleaner imports
- No more `../../../` hell
- Easy to refactor (moving files doesn't break imports)

---

### 3. `vite.config.js`

**Purpose:** Configure Vite (the build tool)

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],           // Enable React support
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),  // Enable @ imports
    },
  },
})
```

**What this does:**
1. **`plugins: [react()]`** - Enables React features (JSX, hot reload)
2. **`alias`** - Makes `@/` work in imports

**When to modify:**
- Adding new plugins
- Configuring build options
- Setting up proxies

---

### 4. `package.json`

**Purpose:** Project manifest - lists dependencies and scripts

```json
{
  "name": "soccer-frontend",
  "dependencies": {
    "react": "^19.2.0",
    "axios": "^1.13.2",
    "zustand": "^5.0.9",
    // ... more dependencies
  },
  "scripts": {
    "dev": "vite",              // Start dev server
    "build": "vite build",      // Build for production
    "preview": "vite preview"   // Preview production build
  }
}
```

**Key sections:**
- **dependencies** - Packages your app needs to run
- **devDependencies** - Tools for development only
- **scripts** - Commands you can run with `npm run`

**Common commands:**
```bash
npm run dev        # Start development server
npm run build      # Create production build
npm install axios  # Add new dependency
```

---

### 5. `index.html`

**Purpose:** The HTML file that loads your React app

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Soccer League</title>
  </head>
  <body>
    <div id="root"></div>               <!-- React mounts here -->
    <script type="module" src="/src/main.jsx"></script>  <!-- Entry point -->
  </body>
</html>
```

**How it works:**
1. Browser loads `index.html`
2. HTML loads `main.jsx`
3. React renders inside `<div id="root">`

**You rarely need to modify this**, unless adding:
- Meta tags for SEO
- External fonts
- External scripts

---

## Source Code Files {#source-code}

### Entry Point: `src/main.jsx`

**Purpose:** Bootstraps the entire React application

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**What happens here:**
1. **Import React libraries**
2. **Import root `<App />` component**
3. **Import global CSS** (Tailwind)
4. **Find `<div id="root">`** in `index.html`
5. **Render `<App />`** inside it

**React.StrictMode:**
- Helps catch bugs during development
- Doesn't affect production build
- Shows warnings in console

**You rarely modify this file** - it just starts your app.

---

### Root Component: `src/App.jsx`

**Purpose:** The root component of your entire application

```javascript
import LoginPage from './pages/LoginPage'

function App() {
  return <LoginPage />
}

export default App
```

**Current behavior:**
- Shows only the LoginPage
- No routing yet (coming later with React Router)

**Future with React Router:**
```javascript
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  )
}
```

---

### Global Styles: `src/index.css`

**Purpose:** Import Tailwind CSS and global styles

```css
@import "tailwindcss";
```

**That's it!** This one line imports all Tailwind utilities.

**You can add custom global styles here:**
```css
@import "tailwindcss";

/* Custom global styles */
body {
  font-family: 'Inter', sans-serif;
}
```

---

## API Layer {#api-layer}

### `src/api/axiosConfig.js`

**Purpose:** Configure HTTP client with global settings

```javascript
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create configured axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,      // Prefix all requests
  timeout: 10000,             // Fail after 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired - logout user
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

**Key concepts:**

#### 1. Base URL
```javascript
baseURL: API_BASE_URL
```
- Every request is prefixed with `http://localhost:8080`
- `/api/auth/login` → `http://localhost:8080/api/auth/login`

#### 2. Request Interceptor
```javascript
interceptors.request.use(...)
```
- Runs **before** every request
- Adds JWT token automatically
- You don't need to manually add token to each request!

#### 3. Response Interceptor
```javascript
interceptors.response.use(...)
```
- Runs **after** every response
- Handles errors globally
- If token expired (401), auto-logout and redirect

**Why this is powerful:**
- Write authentication logic once
- Every API call automatically includes token
- Global error handling

---

### `src/api/authService.js`

**Purpose:** All authentication-related API calls

```javascript
import apiClient from './axiosConfig';

export const authService = {
  // Login
  login: async (email, password) => {
    const response = await apiClient.post('/api/auth/login', {
      email,
      password,
    });
    
    // Save to localStorage
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

  // Get current user
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
};
```

**Why separate service file?**
- ✅ All API calls in one place
- ✅ Easy to test
- ✅ Reusable across components
- ✅ Can swap API later without changing components

**How it's used:**
```javascript
// In a component
import { authService } from '@/api/authService';

const handleLogin = async () => {
  const user = await authService.login(email, password);
  console.log(user);
};
```

---

## State Management {#state-management}

### `src/store/authStore.js`

**Purpose:** Global authentication state (using Zustand)

```javascript
import { create } from 'zustand';
import { authService } from '../api/authService';

export const useAuthStore = create((set) => ({
  // STATE
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  // ACTIONS
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const data = await authService.login(email, password);
      set({ user: data, isAuthenticated: true, loading: false });
      return data;
    } catch (error) {
      set({ error: 'Login failed', loading: false });
      throw error;
    }
  },

  logout: () => {
    authService.logout();
    set({ user: null, isAuthenticated: false });
  },
}));
```

**What is Zustand?**
- Lightweight state management library
- Alternative to Redux (simpler!)
- Global state accessible from any component

**Key parts:**

#### 1. State Variables
```javascript
user: null,              // Current logged-in user
isAuthenticated: false,  // Is user logged in?
loading: false,          // Is API call in progress?
error: null,            // Error message
```

#### 2. Actions (Functions)
```javascript
login: async (email, password) => { ... }
logout: () => { ... }
```

**How to use in components:**
```javascript
import { useAuthStore } from '@/store/authStore';

function MyComponent() {
  const { user, login, logout } = useAuthStore();
  
  return (
    <div>
      {user ? `Welcome ${user.email}` : 'Not logged in'}
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

**Why use global state?**
- ✅ Share data across components
- ✅ No prop drilling
- ✅ Centralized logic

---

## Reusable Components {#components}

### `src/components/ui/Button.jsx`

**Purpose:** Reusable button component

```javascript
export function Button({ 
  children,              // Button text
  variant = 'primary',   // Color variant
  loading = false,       // Show spinner?
  type = 'button',       // HTML button type
  className = '',        // Additional classes
  ...props              // Other props (onClick, disabled, etc.)
}) {
  const variants = {
    primary: 'bg-green-500 hover:bg-green-600 text-white',
    secondary: 'bg-blue-500 hover:bg-blue-600 text-white',
  };
  
  return (
    <button
      type={type}
      className={`${variants[variant]} px-6 py-3 rounded-lg ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}
```

**Props explained:**

- **`children`** - Content inside button
  ```jsx
  <Button>Click me</Button>  // children = "Click me"
  ```

- **`variant`** - Which color scheme
  ```jsx
  <Button variant="primary">Save</Button>
  <Button variant="secondary">Cancel</Button>
  ```

- **`loading`** - Show loading state
  ```jsx
  <Button loading={isSubmitting}>Submit</Button>
  ```

- **`...props`** - Spread operator for other props
  ```jsx
  <Button onClick={handleClick} disabled={true}>
  // Both onClick and disabled are passed through
  ```

**Why reusable components?**
- ✅ Consistent design across app
- ✅ Change in one place, updates everywhere
- ✅ Less code duplication

---

### `src/components/ui/Input.jsx`

**Purpose:** Reusable input field with label and error

```javascript
export function Input({ 
  label,         // Input label text
  error,         // Error message
  type = 'text', // Input type (text, email, password)
  ...props 
}) {
  return (
    <div>
      {label && <label>{label}</label>}
      
      <input
        type={type}
        className={error ? 'border-red-500' : 'border-gray-300'}
        {...props}
      />
      
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
```

**Usage:**
```jsx
<Input
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errors.email}
/>
```

**Conditional rendering:**
```javascript
{label && <label>{label}</label>}
```
- Only shows label if `label` prop is provided
- `&&` is shorthand for "if true, render this"

---

### `src/components/ui/Card.jsx`

**Purpose:** Container with shadow and padding

```javascript
export function Card({ children, title, className = '' }) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-8 ${className}`}>
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
}
```

**Usage:**
```jsx
<Card title="Login">
  <form>...</form>
</Card>
```

**`children` prop:**
- Everything between `<Card>...</Card>` becomes `children`
- Very important React concept!

---

## Pages {#pages}

### `src/pages/LoginPage.jsx`

**Purpose:** Complete login page

**Structure:**
```javascript
import { useState } from 'react';               // Local state
import { useAuthStore } from '../store/authStore';  // Global state
import { Button } from '../components/ui/Button';   // Components

export default function LoginPage() {
  // Local state for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  // Global state from Zustand
  const { login, loading, error } = useAuthStore();
  
  // Functions
  const validateForm = () => { ... };
  const handleSubmit = async (e) => { ... };
  
  // Render UI
  return (
    <div>...</div>
  );
}
```

**Key concepts:**

#### 1. Local State (`useState`)
```javascript
const [email, setEmail] = useState('');
```
- Stores form input values
- Only this component needs this data
- Resets when component unmounts

#### 2. Global State (`useAuthStore`)
```javascript
const { login, loading } = useAuthStore();
```
- Accessible from any component
- Persists across component changes
- Shared data

#### 3. Event Handlers
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();  // Don't reload page
  await login(email, password);
};
```

#### 4. Conditional Rendering
```jsx
{error && <div>{error}</div>}
{loading ? 'Loading...' : 'Submit'}
```

---

## How Data Flows {#data-flow}

### Login Flow (Step by Step)

```
1. User types email/password
   ↓
2. User clicks "Login" button
   ↓
3. handleSubmit() is called
   ↓
4. Validates form inputs
   ↓
5. Calls login() from authStore
   ↓
6. authStore calls authService.login()
   ↓
7. authService makes HTTP request via apiClient
   ↓
8. apiClient sends POST to backend
   ↓
9. Backend validates credentials
   ↓
10. Backend returns JWT token + user data
   ↓
11. authService saves token to localStorage
   ↓
12. authStore updates global state (user, isAuthenticated)
   ↓
13. LoginPage re-renders with new state
   ↓
14. User sees success message
```

**Visual diagram:**

```
┌─────────────┐
│ LoginPage   │  ← User interacts here
└──────┬──────┘
       │
       ↓
┌──────────────┐
│  authStore   │  ← Manages state
└──────┬───────┘
       │
       ↓
┌──────────────┐
│ authService  │  ← Makes API calls
└──────┬───────┘
       │
       ↓
┌──────────────┐
│  apiClient   │  ← Sends HTTP requests
└──────┬───────┘
       │
       ↓
┌──────────────┐
│   Backend    │  ← Java Spring Boot API
└──────────────┘
```

---

## How Components Connect {#component-connections}

### Component Hierarchy

```
main.jsx
  └── App.jsx
        └── LoginPage.jsx
              ├── Card.jsx
              ├── Input.jsx (x2)
              └── Button.jsx
```

### Props Flow (Parent → Child)

```jsx
// Parent passes props to child
<Button variant="primary" onClick={handleClick}>
  Login
</Button>

// Child receives props
function Button({ variant, onClick, children }) {
  // Use the props
}
```

### State Flow (Any Component ← Store)

```jsx
// Any component can access global state
import { useAuthStore } from '@/store/authStore';

function AnyComponent() {
  const { user, login, logout } = useAuthStore();
  // Now this component has access to auth state
}
```

---

## Common Patterns

### Pattern 1: Form Input Handling

```jsx
const [email, setEmail] = useState('');

<input 
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

### Pattern 2: API Call with Loading

```jsx
const [loading, setLoading] = useState(false);

const fetchData = async () => {
  setLoading(true);
  try {
    const data = await apiService.getData();
  } finally {
    setLoading(false);
  }
};
```

### Pattern 3: Conditional Rendering

```jsx
{loading && <Spinner />}
{error && <ErrorMessage />}
{data && <DataDisplay />}
```

---

## File Naming Conventions

### Components
- **PascalCase**: `Button.jsx`, `LoginPage.jsx`
- **Why**: Matches React component names

### Utilities/Services
- **camelCase**: `authService.js`, `axiosConfig.js`
- **Why**: Not components, just functions

### Constants
- **UPPER_SNAKE_CASE**: `API_ENDPOINTS.js`
- **Why**: Convention for constants

---

## Summary

### Key Takeaways

1. **Configuration files** set up your project environment
2. **main.jsx** is the entry point
3. **App.jsx** is the root component
4. **API layer** handles all backend communication
5. **Store** manages global state
6. **Components** are reusable UI pieces
7. **Pages** combine components into full screens

### Mental Model

```
Configuration → Entry Point → Root Component → Pages → Components
     ↓              ↓              ↓              ↓         ↓
   Setup        Bootstrap      Routing        Layout    UI Pieces
```

### When You Need Each File

- **Add new page**: Create in `pages/`
- **Add reusable UI**: Create in `components/ui/`
- **Add API endpoint**: Update `authService.js`
- **Add global state**: Update `authStore.js`
- **Change API URL**: Update `.env.development`
- **Add dependency**: Run `npm install <package>`

---

**You now understand how every file works and connects!** 🎉

Refer back to this guide whenever you're confused about where something goes or how it works.
