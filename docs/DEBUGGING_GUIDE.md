# 🐛 Debugging Guide - Login Issues

## Quick Diagnosis Checklist

When login works in Swagger but not in React, it's usually one of these:

- [ ] CORS issue (most common)
- [ ] Wrong API URL
- [ ] Request format mismatch
- [ ] Backend not running
- [ ] Console errors

---

## Step-by-Step Debugging Process

### Step 1: Open Browser Developer Tools

**How to open:**
- **Mac**: `Cmd + Option + I`
- **Windows**: `F12` or `Ctrl + Shift + I`

**What to check:**
1. **Console Tab** - Look for red errors
2. **Network Tab** - See API requests/responses
3. **Application Tab** - Check localStorage

---

### Step 2: Check Console for Errors

Open **Console tab** and look for:

#### Common Errors:

**❌ CORS Error:**
```
Access to XMLHttpRequest at 'http://localhost:8080/api/auth/login' 
from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Solution:** Backend needs to allow `http://localhost:5173`

**❌ Network Error:**
```
Error: Network Error
```

**Solution:** Backend is not running or wrong URL

**❌ 401 Unauthorized:**
```
Request failed with status code 401
```

**Solution:** Wrong credentials or backend issue

---

### Step 3: Check Network Tab

1. Click **Network tab** in DevTools
2. Try to login
3. Look for the login request (should be `/api/auth/login`)

#### What to check:

**Request Details:**
```
Method: POST
URL: http://localhost:8080/api/auth/login
Status: (should be 200 if successful)
```

**Request Payload (click on the request):**
```json
{
  "email": "your@email.com",
  "password": "yourpassword"
}
```

**Response (if successful):**
```json
{
  "token": "eyJhbGc...",
  "type": "Bearer",
  "userId": 1,
  "email": "your@email.com",
  "rolNombre": "SuperAdmin",
  "rolId": 1,
  "nombreLiga": "My League"
}
```

**Response Headers (check for CORS):**
```
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Credentials: true
```

---

### Step 4: Verify Backend CORS Configuration

Your Java backend should have CORS configured for `http://localhost:5173`

**Check backend file:** `WebConfig.java` or similar

**Should have:**
```java
@Override
public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/api/**")
        .allowedOrigins("http://localhost:5173")  // ← Your React dev server
        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
        .allowedHeaders("*")
        .allowCredentials(true);
}
```

**If it says `http://localhost:3000`:**
- Change it to `http://localhost:5173` (Vite's default port)
- Or add both: `.allowedOrigins("http://localhost:3000", "http://localhost:5173")`

---

### Step 5: Test API Directly

Let's verify the backend is working:

**Option 1: Using curl**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"your@email.com","password":"yourpassword"}'
```

**Option 2: Using browser console**
Open Console and paste:
```javascript
fetch('http://localhost:8080/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'your@email.com',
    password: 'yourpassword'
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error)
```

If this works but React doesn't → CORS issue

---

## Common Issues & Solutions

### Issue 1: CORS Error (Most Common)

**Symptom:**
```
blocked by CORS policy: No 'Access-Control-Allow-Origin' header
```

**Solution:**

**Backend (Java/Spring Boot):**

Update your CORS configuration to allow `http://localhost:5173`:

```java
// WebConfig.java or similar
@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins(
                "http://localhost:5173",  // Vite dev server
                "http://localhost:3000"   // Alternative React port
            )
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true)
            .maxAge(3600);
    }
}
```

**Then restart your backend:**
```bash
cd /Users/alberrtor/projects/soccer-backend
./gradlew bootRun
```

---

### Issue 2: Backend Not Running

**Symptom:**
```
Network Error
ERR_CONNECTION_REFUSED
```

**Solution:**
```bash
# Start your backend
cd /Users/alberrtor/projects/soccer-backend
./gradlew bootRun

# Verify it's running
curl http://localhost:8080/actuator/health
```

---

### Issue 3: Wrong API URL

**Symptom:**
```
404 Not Found
```

**Check:**
1. Backend is running on port `8080`
2. Endpoint is `/api/auth/login`
3. `.env.development` has correct URL

**Verify:**
```bash
# Check what port backend is using
# Look for: "Tomcat started on port(s): 8080"
```

---

### Issue 4: Request Format Mismatch

**Symptom:**
```
400 Bad Request
```

**Check Backend expects:**
```java
// Should accept JSON like:
{
  "email": "string",
  "password": "string"
}
```

**Frontend is sending:**
```javascript
// In authService.js
await apiClient.post('/api/auth/login', {
  email,
  password,
});
```

Make sure field names match exactly!

---

### Issue 5: Invalid Credentials

**Symptom:**
```
401 Unauthorized
```

**Solution:**
1. Verify user exists in database
2. Try the exact same credentials in Swagger
3. Check if password is correct
4. Check if email verification is required

---

## Enhanced Debugging - Add Console Logs

Let's add temporary debugging to see what's happening:

### Update `src/api/axiosConfig.js`

Add logging to see requests:

```javascript
// Request interceptor with logging
apiClient.interceptors.request.use(
  (config) => {
    console.log('🚀 API Request:', {
      method: config.method,
      url: config.baseURL + config.url,
      data: config.data,
      headers: config.headers
    });
    
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor with logging
apiClient.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', {
      status: response.status,
      data: response.data,
      headers: response.headers
    });
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url
    });
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

Now you'll see detailed logs in console!

---

### Update `src/pages/LoginPage.jsx`

Add logging to form submission:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  console.log('📝 Form submitted with:', { email, password: '***' });
  
  if (!validateForm()) {
    console.log('❌ Validation failed');
    return;
  }

  console.log('✅ Validation passed, calling API...');
  
  try {
    const result = await login(email, password);
    console.log('🎉 Login successful:', result);
    alert('¡Login exitoso! Bienvenido');
  } catch (error) {
    console.error('💥 Login failed:', error);
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
  }
};
```

---

## Testing Checklist

### Before Testing:
- [ ] Backend is running (`./gradlew bootRun`)
- [ ] Backend is on port `8080`
- [ ] Frontend is running (`npm run dev`)
- [ ] Frontend is on port `5173`
- [ ] Browser DevTools is open
- [ ] Console tab is visible

### Test Process:
1. Open `http://localhost:5173`
2. Open DevTools Console
3. Enter valid email and password
4. Click "Iniciar Sesión"
5. Watch Console for logs
6. Check Network tab for request

### What You Should See:

**Console Logs:**
```
📝 Form submitted with: {email: "...", password: "***"}
✅ Validation passed, calling API...
🚀 API Request: {method: "post", url: "http://localhost:8080/api/auth/login", ...}
✅ API Response: {status: 200, data: {...}}
🎉 Login successful: {...}
```

**Network Tab:**
- Request to `/api/auth/login`
- Status: `200 OK`
- Response with token and user data

---

## Quick Fixes

### Fix 1: Restart Everything

Sometimes a clean restart fixes issues:

```bash
# Stop everything
# Press Ctrl+C in terminal running frontend
# Press Ctrl+C in terminal running backend

# Start backend
cd /Users/alberrtor/projects/soccer-backend
./gradlew clean
./gradlew bootRun

# Start frontend (in new terminal)
cd /Users/alberrtor/projects/soccer-frontend
npm run dev
```

### Fix 2: Clear Browser Cache

```bash
# Or in browser:
# Cmd+Shift+Delete (Mac)
# Ctrl+Shift+Delete (Windows)
# Check: Cookies, Cache, Site Data
```

### Fix 3: Check Environment Variable

Make sure Vite reads `.env.development`:

```javascript
// In browser console, check:
console.log('API URL:', import.meta.env.VITE_API_BASE_URL);
// Should show: http://localhost:8080
```

If undefined → restart dev server

---

## Example: Working Login Flow

Here's what a successful login looks like:

### 1. Console Output
```
📝 Form submitted with: {email: "admin@test.com", password: "***"}
✅ Validation passed, calling API...
🚀 API Request: {
  method: "post",
  url: "http://localhost:8080/api/auth/login",
  data: {email: "admin@test.com", password: "password123"}
}
✅ API Response: {
  status: 200,
  data: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    userId: 1,
    email: "admin@test.com",
    rolNombre: "SuperAdmin"
  }
}
🎉 Login successful
```

### 2. Network Tab
```
POST http://localhost:8080/api/auth/login
Status: 200 OK
Time: 234ms
```

### 3. LocalStorage
```
token: "eyJhbGc..."
user: "{\"userId\":1,\"email\":\"admin@test.com\",...}"
```

---

## Get Help

If you're still stuck, provide these details:

1. **Console errors** (copy full error message)
2. **Network tab screenshot** (show the failed request)
3. **Backend logs** (what does backend console say?)
4. **What Swagger shows** (working request/response)
5. **Browser used** (Chrome, Firefox, etc.)

---

## Summary

**Most common issue:** CORS  
**Quick fix:** Update backend CORS to allow `http://localhost:5173`  
**Best debugging tool:** Browser DevTools Network + Console tabs  

---

**Remember:** If it works in Swagger but not in React, it's almost always CORS! 🎯
