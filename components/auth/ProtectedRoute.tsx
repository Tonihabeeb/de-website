'use client';

import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: string[];
}

export default function ProtectedRoute({ children, requiredRoles }: ProtectedRouteProps) {
  const { user, loading, token } = useAuth();
  const router = useRouter();

  // Debug log for ProtectedRoute
  console.log('[ProtectedRoute] user:', user);
  console.log('[ProtectedRoute] token:', token);
  console.log('[ProtectedRoute] requiredRoles:', requiredRoles);
  const hasRequiredRole = user && requiredRoles.includes(user.role);
  console.log('[ProtectedRoute] hasRequiredRole:', hasRequiredRole);
  if (!user) {
    console.log('[ProtectedRoute] No user, redirecting to /login');
    router.replace(`/login?redirect=${encodeURIComponent(router.asPath)}`);
    return null;
  }
  if (requiredRoles && !requiredRoles.includes(user.role)) {
    console.log('[ProtectedRoute] User role not authorized, redirecting to /unauthorized');
    router.replace('/unauthorized');
    return null;
  }

  if (loading || !user) {
    return <div className="text-center py-10">Loading...</div>;
  }
  if (requiredRoles && !requiredRoles.includes(user.role)) {
    console.log('[ProtectedRoute] User role not allowed:', user.role, 'Required:', requiredRoles);
    return <div className="text-center py-10 text-red-600">You do not have permission to view this page.</div>;
  }
  console.log('[ProtectedRoute] Access granted, rendering children');
  return <>{children}</>;
}
