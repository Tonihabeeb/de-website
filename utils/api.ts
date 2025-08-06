const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

export class ApiException extends Error {
  public status: number;
  public code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = 'ApiException';
    this.status = status;
    this.code = code;
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    };

    const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

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

      throw new ApiException(errorMessage, res.status);
    }

    // Handle empty responses
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return res.json() as Promise<T>;
    }

    return res.text() as Promise<T>;
  } catch (error) {
    if (error instanceof ApiException) {
      throw error;
    }

    // Network errors or other issues
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ApiException(
        'Network error: Unable to connect to server',
        0,
        'NETWORK_ERROR'
      );
    }

    throw new ApiException(
      error instanceof Error ? error.message : 'Unknown error occurred',
      0,
      'UNKNOWN_ERROR'
    );
  }
}

// Convenience functions for common HTTP methods
export const api = {
  get: <T>(path: string) => apiFetch<T>(path),

  post: <T>(path: string, data?: any) =>
    apiFetch<T>(path, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: <T>(path: string, data?: any) =>
    apiFetch<T>(path, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }),

  patch: <T>(path: string, data?: any) =>
    apiFetch<T>(path, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T>(path: string) =>
    apiFetch<T>(path, {
      method: 'DELETE',
    }),
};
