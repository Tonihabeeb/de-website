'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';

interface AuthUser {
  userId: string;
  role: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasAnyRole: (roles: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Add new types for enhanced context
interface EnhancedAuthContextType extends AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  hasAnyRole: (roles: string[]) => boolean;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Start as true for session restore
  const [error, setError] = useState<string | null>(null);

  // Restore session from localStorage
  useEffect(() => {
    const storedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    console.log('[AuthContext] useEffect - storedToken:', storedToken);
    if (storedToken) {
      try {
        const decoded = jwtDecode<{ userId: string; role: string; name: string; email: string }>(storedToken);
        console.log('[AuthContext] useEffect - decoded:', decoded);
        setUser({ 
          userId: decoded.userId, 
          role: decoded.role,
          name: decoded.name,
          email: decoded.email
        });
        setToken(storedToken);
      } catch (err) {
        console.error('[AuthContext] useEffect - jwtDecode error:', err);
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
      }
    }
    setLoading(false); // Session restore complete
  }, []);

  async function login(email: string, password: string): Promise<void> {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      console.log('[AuthContext] login - response status:', res.status);
      const data = await res.json();
      console.log('[AuthContext] login - response data:', data);
      console.log('[AuthContext] login - data.success:', data.success);
      console.log('[AuthContext] login - data.token:', data.token ? 'exists' : 'missing');
      
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }
      
      // Handle both formats: {success: true, token: "..."} and {token: "..."}
      if ((data.success && data.token) || data.token) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        try {
          const decoded = jwtDecode<{ userId: string; role: string; name: string; email: string }>(data.token);
          console.log('[AuthContext] login - decoded:', decoded);
          setUser({ 
            userId: decoded.userId, 
            role: decoded.role,
            name: decoded.name,
            email: decoded.email
          });
          console.log('[AuthContext] login - setUser:', { 
            userId: decoded.userId, 
            role: decoded.role,
            name: decoded.name,
            email: decoded.email
          });
          // Don't redirect here - let the login page handle it
          console.log('[AuthContext] login - successful, user set');
        } catch (err) {
          console.error('[AuthContext] login - jwtDecode error:', err);
          setUser(null);
          setToken(null);
          localStorage.removeItem('token');
          throw new Error('Invalid token format');
        }
      } else {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        throw new Error('Invalid response format - missing token');
      }
    } catch (err: any) {
      console.error('[AuthContext] login - error:', err);
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
      throw err; // Re-throw the error so the login page can handle it
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log('[AuthContext] useEffect - token:', token, 'user:', user);
  }, [token, user]);

  useEffect(() => {
    console.log('[AuthContext] user state changed:', user);
  }, [user]);

  function logout() {
    console.log('[AuthContext] logout called');
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    setLoading(false);
    console.log('[AuthContext] logout - user logged out');
    router.push('/login');
  }

  async function register(name: string, email: string, password: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Registration failed');
        setLoading(false);
        return;
      }
      setLoading(false);
      router.push('/login');
    } catch {
      setError('Network error');
      setLoading(false);
    }
  }

  // Add a log in the context provider render
  useEffect(() => {
    console.log('[AuthContext] Provider render - user:', user, 'token:', token);
  }, [user, token]);

  // Utility: check if user has any of the given roles
  const hasAnyRole = (roles: string[]) => {
    if (!user || !user.role) return false;
    const normalize = (role: string) => role.replace(/_/g, '').toLowerCase();
    const userRoleNorm = normalize(user.role);
    return roles.some(r => normalize(r) === userRoleNorm);
  };

  const isAuthenticated = !!user;
  const isLoading = loading;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        register,
        loading,
        error,
        isAuthenticated,
        isLoading,
        hasAnyRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext) as EnhancedAuthContextType;
  console.log('[useAuth] context:', context);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function useUser() {
  const { user } = useAuth();
  return user;
}
