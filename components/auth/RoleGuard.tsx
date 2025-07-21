'use client';

import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface RoleGuardProps {
  children: ReactNode;
  roles: ('user' | 'admin' | 'super_admin' | 'editor' | 'viewer')[];
  fallback?: ReactNode;
}

export default function RoleGuard({
  children,
  roles,
  fallback = null,
}: RoleGuardProps) {
  const { hasAnyRole, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return fallback;
  }

  if (!hasAnyRole(roles)) {
    return fallback;
  }

  return <>{children}</>;
}
