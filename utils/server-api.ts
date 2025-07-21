const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

export class ServerApiException extends Error {
  public status: number;
  public code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = 'ServerApiException';
    this.status = status;
    this.code = code;
  }
}

/**
 * Server-side API fetch utility for SSR/SSG
 * This version doesn't use localStorage or browser-specific APIs
 */
export async function serverApiFetch<T>(
  path: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((options.headers as Record<string, string>) || {}),
    };

    // Add authorization header if token is provided
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      let errorMessage = `HTTP ${res.status}: ${res.statusText}`;

      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        // If JSON parsing fails, use the text response
        try {
          errorMessage = await res.text();
        } catch {
          // If text parsing also fails, use default message
        }
      }

      throw new ServerApiException(errorMessage, res.status);
    }

    // Handle empty responses
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return res.json() as Promise<T>;
    }

    return res.text() as Promise<T>;
  } catch (error) {
    if (error instanceof ServerApiException) {
      throw error;
    }

    // Network errors or other issues
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ServerApiException(
        'Network error: Unable to connect to server',
        0,
        'NETWORK_ERROR'
      );
    }

    throw new ServerApiException(
      error instanceof Error ? error.message : 'Unknown error occurred',
      0,
      'UNKNOWN_ERROR'
    );
  }
}

// Convenience functions for common HTTP methods
export const serverApi = {
  get: <T>(path: string, token?: string) => serverApiFetch<T>(path, {}, token),

  post: <T>(path: string, data?: any, token?: string) =>
    serverApiFetch<T>(
      path,
      {
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined,
      },
      token
    ),

  put: <T>(path: string, data?: any, token?: string) =>
    serverApiFetch<T>(
      path,
      {
        method: 'PUT',
        body: data ? JSON.stringify(data) : undefined,
      },
      token
    ),

  patch: <T>(path: string, data?: any, token?: string) =>
    serverApiFetch<T>(
      path,
      {
        method: 'PATCH',
        body: data ? JSON.stringify(data) : undefined,
      },
      token
    ),

  delete: <T>(path: string, token?: string) =>
    serverApiFetch<T>(
      path,
      {
        method: 'DELETE',
      },
      token
    ),
};

/**
 * Get authentication token from cookies (for SSR)
 * This is a placeholder - implement based on your cookie strategy
 */
export function getAuthTokenFromCookies(cookies: any): string | undefined {
  // Implementation depends on your cookie strategy
  // Example: return cookies.get('auth-token')?.value;
  return undefined;
}

/**
 * Server-side data fetching with authentication
 */
export async function authenticatedServerFetch<T>(
  path: string,
  cookies: any,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthTokenFromCookies(cookies);
  return serverApiFetch<T>(path, options, token);
}
