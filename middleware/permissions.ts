import { NextRequest, NextResponse } from 'next/server';
import { UserModel, UserRole } from '@/database/models/User';

// Simple token verification function for analytics APIs
export async function verifyToken(token: string): Promise<any> {
  try {
    // This is a simplified version - in production, you'd verify the JWT token
    // For now, we'll assume the token contains user information
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
    return await UserModel.findById(decoded.userId);
  } catch (error) {
    return null;
  }
}

export interface PermissionMiddlewareOptions {
  requiredPermissions?: (keyof import('@/database/models/User').UserPermissions)[];
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
        return { user: null, hasAccess: false, error: 'No valid authorization token' };
      }

      const token = authHeader.substring(7);
      const user = await this.getUserFromToken(token);
      
      if (!user) {
        return { user: null, hasAccess: false, error: 'Invalid token' };
      }

      if (!user.is_active) {
        return { user: null, hasAccess: false, error: 'User account is inactive' };
      }

      // Check required roles
      if (options.requiredRoles && options.requiredRoles.length > 0) {
        const hasRequiredRole = options.requiredRoles.includes(user.role);
        if (!hasRequiredRole) {
          return { user, hasAccess: false, error: 'Insufficient role permissions' };
        }
      }

      // Check required permissions
      if (options.requiredPermissions && options.requiredPermissions.length > 0) {
        const userPermissions = await UserModel.getPermissions(user.id);
        
        for (const permission of options.requiredPermissions) {
          if (!userPermissions[permission]) {
            return { user, hasAccess: false, error: `Missing permission: ${permission}` };
          }
        }
      }

      return { user, hasAccess: true };
    } catch (error) {
      console.error('Permission check error:', error);
      return { user: null, hasAccess: false, error: 'Permission check failed' };
    }
  }

  static async getUserFromToken(token: string): Promise<any> {
    try {
      // This is a simplified version - in production, you'd verify the JWT token
      // For now, we'll assume the token contains user information
      const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
      return await UserModel.findById(decoded.userId);
    } catch (error) {
      return null;
    }
  }

  static requirePermission(permission: keyof import('@/database/models/User').UserPermissions) {
    return async (request: NextRequest) => {
      const result = await this.checkPermissions(request, { requiredPermissions: [permission] });
      
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
      const result = await this.checkPermissions(request, { requiredRoles: [role] });
      
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
    return this.requireRole(UserRole.SUPER_ADMIN);
  }

  static requireAdmin() {
    return async (request: NextRequest) => {
      const result = await this.checkPermissions(request, { 
        requiredRoles: [UserRole.SUPER_ADMIN, UserRole.ADMIN] 
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
        requiredRoles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR] 
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
        requiredRoles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR, UserRole.AUTHOR] 
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

export const requireCreatePages = () => PermissionMiddleware.requirePermission('canCreatePages');
export const requireEditPages = () => PermissionMiddleware.requirePermission('canEditPages');
export const requireViewPages = () => PermissionMiddleware.requirePermission('canViewPages');
export const requireDeletePages = () => PermissionMiddleware.requirePermission('canDeletePages');
export const requirePublishPages = () => PermissionMiddleware.requirePermission('canPublishPages');

export const requireCreateProjects = () => PermissionMiddleware.requirePermission('canCreateProjects');
export const requireEditProjects = () => PermissionMiddleware.requirePermission('canEditProjects');
export const requireViewProjects = () => PermissionMiddleware.requirePermission('canViewProjects');
export const requireDeleteProjects = () => PermissionMiddleware.requirePermission('canDeleteProjects');

export const requireCreateUsers = () => PermissionMiddleware.requirePermission('canCreateUsers');
export const requireEditUsers = () => PermissionMiddleware.requirePermission('canEditUsers');
export const requireDeleteUsers = () => PermissionMiddleware.requirePermission('canDeleteUsers');
export const requireAssignRoles = () => PermissionMiddleware.requirePermission('canAssignRoles');

export const requireManageSettings = () => PermissionMiddleware.requirePermission('canManageSettings');
export const requireManageNavigation = () => PermissionMiddleware.requirePermission('canManageNavigation');
export const requireManageMedia = () => PermissionMiddleware.requirePermission('canManageMedia');
export const requireViewAnalytics = () => PermissionMiddleware.requirePermission('canViewAnalytics'); 