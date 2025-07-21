import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import RoleGuard from '@/components/auth/RoleGuard';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { apiFetch } from '@/utils/api';

// Mock the API utility
jest.mock('@/utils/api');
const mockApiFetch = apiFetch as jest.MockedFunction<typeof apiFetch>;

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Test component to access auth context
const TestComponent = ({
  email = 'admin@example.com',
  password = 'wrong-password',
}: {
  email?: string;
  password?: string;
}) => {
  const { user, isAuthenticated, login, logout, hasRole } = useAuth();
  const [error, setError] = React.useState<string | null>(null);

  return (
    <div>
      <div data-testid='auth-status'>
        {isAuthenticated ? 'authenticated' : 'unauthenticated'}
      </div>
      <div data-testid='user-info'>
        {user ? `${user.name} (${user.role})` : 'no user'}
      </div>
      <div data-testid='admin-access'>
        {hasRole('admin') ? 'admin-yes' : 'admin-no'}
      </div>
      <div data-testid='editor-access'>
        {hasRole('editor') ? 'editor-yes' : 'editor-no'}
      </div>
      {error && <div data-testid='auth-error'>{error}</div>}
      <button
        onClick={async () => {
          try {
            await login(email, password);
          } catch (e: any) {
            setError(e.message);
          }
        }}
      >
        Login
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('Authentication Integration Tests', () => {
  beforeEach(() => {
    mockApiFetch.mockClear();
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
    mockLocalStorage.removeItem.mockClear();
  });

  describe('AuthContext', () => {
    it('should provide initial unauthenticated state', () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      expect(screen.getByTestId('auth-status')).toHaveTextContent(
        'unauthenticated'
      );
      expect(screen.getByTestId('user-info')).toHaveTextContent('no user');
      expect(screen.getByTestId('admin-access')).toHaveTextContent('admin-no');
      expect(screen.getByTestId('editor-access')).toHaveTextContent(
        'editor-no'
      );
    });

    it('should handle successful login', async () => {
      const mockUser = {
        _id: '1',
        name: 'Test User',
        email: 'test@example.com',
        role: 'admin',
      };

      const mockResponse = {
        user: mockUser,
        token: 'test-token',
      };

      mockApiFetch.mockResolvedValueOnce(mockResponse);

      render(
        <AuthProvider>
          <TestComponent email='test@example.com' password='password' />
        </AuthProvider>
      );

      fireEvent.click(screen.getByText('Login'));

      await waitFor(() => {
        expect(mockApiFetch).toHaveBeenCalledWith('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify({
            email: 'test@example.com',
            password: 'password',
          }),
        });
      });

      await waitFor(() => {
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
          'token',
          'test-token'
        );
      });

      await waitFor(() => {
        expect(screen.getByTestId('auth-status')).toHaveTextContent(
          'authenticated'
        );
        expect(screen.getByTestId('user-info')).toHaveTextContent(
          'Test User (admin)'
        );
        expect(screen.getByTestId('admin-access')).toHaveTextContent(
          'admin-yes'
        );
      });
    });

    it('should handle login failure', async () => {
      mockApiFetch.mockRejectedValueOnce(new Error('Invalid credentials'));

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      const loginButton = screen.getByText('Login');
      fireEvent.click(loginButton);

      // Wait for the error message to appear in the UI
      await waitFor(() => {
        expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
      });

      expect(screen.getByTestId('auth-status')).toHaveTextContent(
        'unauthenticated'
      );
      expect(mockLocalStorage.setItem).not.toHaveBeenCalled();
    });

    it('should handle logout', async () => {
      // First login
      const mockUser = {
        _id: '1',
        name: 'Test User',
        email: 'test@example.com',
        role: 'admin',
      };

      mockApiFetch.mockResolvedValueOnce({
        user: mockUser,
        token: 'test-token',
      });

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      fireEvent.click(screen.getByText('Login'));

      await waitFor(() => {
        expect(screen.getByTestId('auth-status')).toHaveTextContent(
          'authenticated'
        );
      });

      // Then logout
      fireEvent.click(screen.getByText('Logout'));

      await waitFor(() => {
        expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('token');
      });

      await waitFor(() => {
        expect(screen.getByTestId('auth-status')).toHaveTextContent(
          'unauthenticated'
        );
        expect(screen.getByTestId('user-info')).toHaveTextContent('no user');
      });
    });

    it('should restore authentication from localStorage on mount', async () => {
      const mockUser = {
        _id: '1',
        name: 'Test User',
        email: 'test@example.com',
        role: 'editor',
      };

      // Set both token and user data in localStorage
      mockLocalStorage.getItem
        .mockReturnValueOnce('test-token') // for 'token'
        .mockReturnValueOnce(JSON.stringify(mockUser)); // for 'user'

      mockApiFetch.mockResolvedValueOnce({ user: mockUser });

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('auth-status')).toHaveTextContent(
          'authenticated'
        );
        expect(screen.getByTestId('user-info')).toHaveTextContent(
          'Test User (editor)'
        );
        expect(screen.getByTestId('editor-access')).toHaveTextContent(
          'editor-yes'
        );
      });
    });
  });

  describe('RoleGuard Component', () => {
    const TestRoleGuard = ({
      roles,
    }: {
      roles: ('user' | 'admin' | 'editor' | 'viewer')[];
    }) => (
      <AuthProvider>
        <RoleGuard roles={roles}>
          <div data-testid='protected-content'>Protected Content</div>
        </RoleGuard>
      </AuthProvider>
    );

    it('should show content when user has required role', async () => {
      const mockUser = {
        _id: '1',
        name: 'Test User',
        email: 'test@example.com',
        role: 'admin',
      };

      mockLocalStorage.getItem
        .mockReturnValueOnce('test-token')
        .mockReturnValueOnce(JSON.stringify(mockUser));
      mockApiFetch.mockResolvedValueOnce({ user: mockUser });

      render(<TestRoleGuard roles={['admin']} />);

      await waitFor(() => {
        expect(screen.getByTestId('protected-content')).toBeInTheDocument();
      });
    });

    it('should hide content when user lacks required role', async () => {
      const mockUser = {
        _id: '1',
        name: 'Test User',
        email: 'test@example.com',
        role: 'viewer',
      };

      mockLocalStorage.getItem
        .mockReturnValueOnce('test-token')
        .mockReturnValueOnce(JSON.stringify(mockUser));
      mockApiFetch.mockResolvedValueOnce({ user: mockUser });

      render(<TestRoleGuard roles={['admin']} />);

      await waitFor(() => {
        expect(
          screen.queryByTestId('protected-content')
        ).not.toBeInTheDocument();
      });
    });

    it('should hide content when user is not authenticated', () => {
      render(<TestRoleGuard roles={['admin']} />);

      expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
    });

    it('should show content for multiple roles', async () => {
      const mockUser = {
        _id: '1',
        name: 'Test User',
        email: 'test@example.com',
        role: 'editor',
      };

      mockLocalStorage.getItem
        .mockReturnValueOnce('test-token')
        .mockReturnValueOnce(JSON.stringify(mockUser));
      mockApiFetch.mockResolvedValueOnce({ user: mockUser });

      render(<TestRoleGuard roles={['admin', 'editor']} />);

      await waitFor(() => {
        expect(screen.getByTestId('protected-content')).toBeInTheDocument();
      });
    });
  });

  describe('ProtectedRoute Component', () => {
    const TestProtectedRoute = () => (
      <AuthProvider>
        <ProtectedRoute>
          <div data-testid='protected-route-content'>
            Protected Route Content
          </div>
        </ProtectedRoute>
      </AuthProvider>
    );

    it('should show content when authenticated', async () => {
      const mockUser = {
        _id: '1',
        name: 'Test User',
        email: 'test@example.com',
        role: 'user',
      };

      mockLocalStorage.getItem
        .mockReturnValueOnce('test-token')
        .mockReturnValueOnce(JSON.stringify(mockUser));
      mockApiFetch.mockResolvedValueOnce({ user: mockUser });

      render(<TestProtectedRoute />);

      await waitFor(() => {
        expect(
          screen.getByTestId('protected-route-content')
        ).toBeInTheDocument();
      });
    });

    it('should redirect when not authenticated', () => {
      const mockPush = jest.fn();
      jest.doMock('next/navigation', () => ({
        useRouter: () => ({
          push: mockPush,
        }),
      }));

      render(<TestProtectedRoute />);

      expect(
        screen.queryByTestId('protected-route-content')
      ).not.toBeInTheDocument();
    });
  });

  describe('Role-based Access Control', () => {
    it('should correctly check admin role', async () => {
      const mockUser = {
        _id: '1',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin',
      };

      // Mock localStorage and API calls
      mockLocalStorage.getItem
        .mockReturnValueOnce('test-token') // for 'token'
        .mockReturnValueOnce(JSON.stringify(mockUser)); // for 'user'
      mockApiFetch.mockResolvedValueOnce({ user: mockUser });

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('auth-status')).toHaveTextContent(
          'authenticated'
        );
        expect(screen.getByTestId('user-info')).toHaveTextContent(
          'Admin User (admin)'
        );
        expect(screen.getByTestId('admin-access')).toHaveTextContent(
          'admin-yes'
        );
        expect(screen.getByTestId('editor-access')).toHaveTextContent(
          'editor-yes'
        ); // Admin has editor access
      });
    });

    it('should correctly check editor role', async () => {
      const mockUser = {
        _id: '1',
        name: 'Editor User',
        email: 'editor@example.com',
        role: 'editor',
      };

      mockLocalStorage.getItem
        .mockReturnValueOnce('test-token')
        .mockReturnValueOnce(JSON.stringify(mockUser));
      mockApiFetch.mockResolvedValueOnce({ user: mockUser });

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('admin-access')).toHaveTextContent(
          'admin-no'
        );
        expect(screen.getByTestId('editor-access')).toHaveTextContent(
          'editor-yes'
        );
      });
    });

    it('should correctly check viewer role', async () => {
      const mockUser = {
        _id: '1',
        name: 'Viewer User',
        email: 'viewer@example.com',
        role: 'viewer',
      };

      mockLocalStorage.getItem
        .mockReturnValueOnce('test-token')
        .mockReturnValueOnce(JSON.stringify(mockUser));
      mockApiFetch.mockResolvedValueOnce({ user: mockUser });

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('admin-access')).toHaveTextContent(
          'admin-no'
        );
        expect(screen.getByTestId('editor-access')).toHaveTextContent(
          'editor-no'
        );
      });
    });
  });
});
