import { NextRequest, NextResponse } from 'next/server';

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'AUTHOR' | 'USER';

export interface PermissionMiddlewareOptions {
  requiredPermissions?: string[];
  requiredRoles?: UserRole[];
  allowOwnResource?: boolean;
}

export class PermissionMiddleware {
  static async checkPermissions(
    request: NextRequest,
    options: PermissionMiddlewareOptions = {}
  ): Promise<{ user: any; hasAccess: boolean; error?: string }> {
    try {
      // Get user from request (assuming JWT token is in Authorization header)
      const authHeader = request.headers.get('authorization');
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return {
          user: null,
          hasAccess: false,
          error: 'No valid authorization token',
        };
      }

      const token = authHeader.substring(7);
      const user = await this.getUserFromToken(token, request);

      if (!user) {
        return { user: null, hasAccess: false, error: 'Invalid token' };
      }

      if (!user.is_active) {
        return {
          user: null,
          hasAccess: false,
          error: 'User account is inactive',
        };
      }

      // Check required roles
      if (options.requiredRoles && options.requiredRoles.length > 0) {
        const hasRequiredRole = options.requiredRoles.includes(user.role);
        if (!hasRequiredRole) {
          return {
            user,
            hasAccess: false,
            error: 'Insufficient role permissions',
          };
        }
      }

      // Check required permissions
      if (
        options.requiredPermissions &&
        options.requiredPermissions.length > 0
      ) {
        const userPermissions = await this.getUserPermissions(user.id, request);
        for (const permission of options.requiredPermissions) {
          if (!userPermissions[permission]) {
            return {
              user,
              hasAccess: false,
              error: `Missing permission: ${permission}`,
            };
          }
        }
      }

      return { user, hasAccess: true };
    } catch (error) {
      console.error('Permission check error:', error);
      return { user: null, hasAccess: false, error: 'Permission check failed' };
    }
  }

  static async getUserFromToken(token: string, request: NextRequest): Promise<any> {
    try {
      // This is a simplified version - in production, you'd verify the JWT token
      // For now, we'll assume the token contains user information
      const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
      const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
      const res = await fetch(`${backendUrl}/api/users/${decoded.userId}`, {
        headers: {
          Authorization: request.headers.get('authorization') || '',
        },
      });
      if (!res.ok) return null;
      return await res.json();
    } catch (error) {
      return null;
    }
  }

  static async getUserPermissions(userId: string, request: NextRequest): Promise<Record<string, boolean>> {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
      const res = await fetch(`${backendUrl}/api/users/${userId}/permissions`, {
        headers: {
          Authorization: request.headers.get('authorization') || '',
        },
      });
      if (!res.ok) return {};
      return await res.json();
    } catch (error) {
      return {};
    }
  }

  static requirePermission(permission: string) {
    return async (request: NextRequest) => {
      const result = await this.checkPermissions(request, {
        requiredPermissions: [permission],
      });

      if (!result.hasAccess) {
        return NextResponse.json(
          { error: result.error || 'Permission denied' },
          { status: 403 }
        );
      }

      return null; // Continue to next middleware/handler
    };
  }

  static requireRole(role: UserRole) {
    return async (request: NextRequest) => {
      const result = await this.checkPermissions(request, {
        requiredRoles: [role],
      });

      if (!result.hasAccess) {
        return NextResponse.json(
          { error: result.error || 'Role access denied' },
          { status: 403 }
        );
      }

      return null; // Continue to next middleware/handler
    };
  }

  static requireSuperAdmin() {
    return this.requireRole('SUPER_ADMIN');
  }

  static requireAdmin() {
    return async (request: NextRequest) => {
      const result = await this.checkPermissions(request, {
        requiredRoles: ['SUPER_ADMIN', 'ADMIN'],
      });

      if (!result.hasAccess) {
        return NextResponse.json(
          { error: result.error || 'Admin access required' },
          { status: 403 }
        );
      }

      return null;
    };
  }

  static requireEditor() {
    return async (request: NextRequest) => {
      const result = await this.checkPermissions(request, {
        requiredRoles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR'],
      });

      if (!result.hasAccess) {
        return NextResponse.json(
          { error: result.error || 'Editor access required' },
          { status: 403 }
        );
      }

      return null;
    };
  }

  static requireAuthor() {
    return async (request: NextRequest) => {
      const result = await this.checkPermissions(request, {
        requiredRoles: [
          'SUPER_ADMIN',
          'ADMIN',
          'EDITOR',
          'AUTHOR',
        ],
      });

      if (!result.hasAccess) {
        return NextResponse.json(
          { error: result.error || 'Author access required' },
          { status: 403 }
        );
      }

      return null;
    };
  }
}

// Convenience functions for common permission checks
export const requireSuperAdmin = () => PermissionMiddleware.requireSuperAdmin();
export const requireAdmin = () => PermissionMiddleware.requireAdmin();
export const requireEditor = () => PermissionMiddleware.requireEditor();
export const requireAuthor = () => PermissionMiddleware.requireAuthor();

export const requireCreatePages = () =>
  PermissionMiddleware.requirePermission('canCreatePages');
export const requireEditPages = () =>
  PermissionMiddleware.requirePermission('canEditPages');
export const requireViewPages = () =>
  PermissionMiddleware.requirePermission('canViewPages');
export const requireDeletePages = () =>
  PermissionMiddleware.requirePermission('canDeletePages');
export const requirePublishPages = () =>
  PermissionMiddleware.requirePermission('canPublishPages');

export const requireCreateProjects = () =>
  PermissionMiddleware.requirePermission('canCreateProjects');
export const requireEditProjects = () =>
  PermissionMiddleware.requirePermission('canEditProjects');
export const requireViewProjects = () =>
  PermissionMiddleware.requirePermission('canViewProjects');
export const requireDeleteProjects = () =>
  PermissionMiddleware.requirePermission('canDeleteProjects');

export const requireCreateUsers = () =>
  PermissionMiddleware.requirePermission('canCreateUsers');
export const requireEditUsers = () =>
  PermissionMiddleware.requirePermission('canEditUsers');
export const requireDeleteUsers = () =>
  PermissionMiddleware.requirePermission('canDeleteUsers');
export const requireAssignRoles = () =>
  PermissionMiddleware.requirePermission('canAssignRoles');

export const requireManageSettings = () =>
  PermissionMiddleware.requirePermission('canManageSettings');
export const requireManageNavigation = () =>
  PermissionMiddleware.requirePermission('canManageNavigation');
export const requireManageMedia = () =>
  PermissionMiddleware.requirePermission('canManageMedia');
export const requireViewAnalytics = () =>
  PermissionMiddleware.requirePermission('canViewAnalytics');
