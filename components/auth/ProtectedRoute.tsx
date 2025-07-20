'use client';

import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: ('user' | 'admin' | 'editor' | 'viewer')[];
  redirectTo?: string;
}

export default function ProtectedRoute({ 
  children, 
  requiredRoles = [], 
  redirectTo = '/login' 
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user, hasAnyRole } = useAuth();
  
  // Conditionally use router to handle test environment
  let router: any = null;
  try {
    router = useRouter();
  } catch (error) {
    // Router not available in test environment
    // Silently handle this in test environment
  }

  useEffect(() => {
    if (!isLoading && router) {
      if (!isAuthenticated) {
        router.push(redirectTo);
        return;
      }

      if (requiredRoles.length > 0 && !hasAnyRole(requiredRoles)) {
        router.push('/unauthorized');
        return;
      }
    }
  }, [isAuthenticated, isLoading, user, requiredRoles, hasAnyRole, router, redirectTo]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  if (requiredRoles.length > 0 && !hasAnyRole(requiredRoles)) {
    return null; // Will redirect to unauthorized
  }

  return <>{children}</>;
} 