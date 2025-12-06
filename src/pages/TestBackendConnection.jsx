import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

/**
 * Backend Connection Test Page
 * Use this to test if backend is reachable and CORS is configured
 */
export default function TestBackendConnection() {
  const [result, setResult] = useState(null);
  const [testing, setTesting] = useState(false);

  const testConnection = async () => {
    setTesting(true);
    setResult(null);

    const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
    
    console.log('🔍 Testing backend connection to:', apiUrl);

    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@test.com',
          password: 'test123'
        })
      });

      const data = await response.json();

      setResult({
        success: response.ok,
        status: response.status,
        statusText: response.statusText,
        data: data,
        message: response.ok ? '✅ Backend is reachable!' : '❌ Backend returned error'
      });

      console.log('✅ Test complete:', { status: response.status, data });
    } catch (error) {
      setResult({
        success: false,
        error: error.message,
        message: '❌ Cannot connect to backend',
        details: error.toString()
      });

      console.error('❌ Connection test failed:', error);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <Card title="🔧 Backend Connection Test">
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 p-4 rounded">
              <p className="text-sm text-blue-800">
                <strong>API URL:</strong> {import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'}
              </p>
            </div>

            <Button onClick={testConnection} loading={testing} className="w-full">
              Test Backend Connection
            </Button>

            {result && (
              <div className={`p-4 rounded border ${
                result.success 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <h3 className="font-bold mb-2">{result.message}</h3>
                
                {result.status && (
                  <p className="text-sm mb-2">
                    <strong>Status:</strong> {result.status} {result.statusText}
                  </p>
                )}

                {result.error && (
                  <div className="text-sm">
                    <strong>Error:</strong>
                    <pre className="mt-2 p-2 bg-white rounded text-xs overflow-x-auto">
                      {result.error}
                    </pre>
                    {result.error.includes('CORS') && (
                      <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                        <p className="font-bold text-yellow-800">🚨 CORS Issue Detected!</p>
                        <p className="text-sm text-yellow-700 mt-1">
                          Your backend needs to allow requests from: <code>http://localhost:5173</code>
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {result.data && (
                  <div className="text-sm mt-2">
                    <strong>Response:</strong>
                    <pre className="mt-2 p-2 bg-white rounded text-xs overflow-x-auto">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            )}

            <div className="border-t pt-4 mt-4">
              <h4 className="font-bold mb-2">Quick Checks:</h4>
              <ul className="text-sm space-y-1">
                <li>✓ Backend running on port 8080?</li>
                <li>✓ CORS configured for http://localhost:5173?</li>
                <li>✓ Endpoint /api/auth/login exists?</li>
              </ul>
            </div>
          </div>
        </Card>

        <div className="mt-4">
          <a 
            href="/login" 
            className="text-blue-600 hover:underline"
          >
            ← Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
