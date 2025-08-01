'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Shield, AlertTriangle } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRoles?: ('user' | 'admin' | 'editor' | 'viewer')[];
  fallback?: React.ReactNode;
  redirectTo?: string;
}

export default function AuthGuard({
  children,
  requiredRoles = [],
  fallback,
  redirectTo = '/login',
}: AuthGuardProps) {
  const { user, isAuthenticated, isLoading, hasAnyRole } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      // If not authenticated, redirect to login
      if (!isAuthenticated) {
        router.push(`${redirectTo}?redirect=${encodeURIComponent(pathname)}`);
        return;
      }

      // If roles are required, check if user has required roles
      if (requiredRoles.length > 0 && user) {
        if (!hasAnyRole(requiredRoles)) {
          // User doesn't have required role, redirect to unauthorized page
          router.push('/unauthorized');
          return;
        }
      }

      setIsChecking(false);
    }
  }, [
    isAuthenticated,
    isLoading,
    user,
    requiredRoles,
    hasAnyRole,
    router,
    pathname,
    redirectTo,
  ]);

  // Show loading state while checking authentication
  if (isLoading || isChecking) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <Loader2 className='w-8 h-8 animate-spin text-primary mx-auto mb-4' />
          <p className='text-gray-600'>Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show fallback or loading
  if (!isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <Shield className='w-8 h-8 text-primary mx-auto mb-4' />
          <p className='text-gray-600'>Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // If user doesn't have required roles
  if (requiredRoles.length > 0 && user && !hasAnyRole(requiredRoles)) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <AlertTriangle className='w-8 h-8 text-red-500 mx-auto mb-4' />
          <h2 className='text-xl font-semibold text-gray-900 mb-2'>
            Access Denied
          </h2>
          <p className='text-gray-600 mb-4'>
            You don't have permission to access this page.
          </p>
          <button
            onClick={() => router.push('/')}
            className='px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors'
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  // User is authenticated and has required roles (if any)
  return <>{children}</>;
}

// Convenience components for different access levels
export function AdminGuard({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return (
    <AuthGuard requiredRoles={['admin']} fallback={fallback}>
      {children}
    </AuthGuard>
  );
}

export function UserGuard({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return (
    <AuthGuard
      requiredRoles={['user', 'admin', 'editor', 'viewer']}
      fallback={fallback}
    >
      {children}
    </AuthGuard>
  );
}

export function EditorGuard({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return (
    <AuthGuard requiredRoles={['editor', 'admin']} fallback={fallback}>
      {children}
    </AuthGuard>
  );
}
