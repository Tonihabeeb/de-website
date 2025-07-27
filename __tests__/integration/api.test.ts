import { apiFetch, ApiException } from '@/utils/api';
import { serverApiFetch, ServerApiException } from '@/utils/server-api';

// Ensure global.fetch is a Jest mock for this test file
const originalFetch = global.fetch;
(global as any).fetch = jest.fn();

// Use the global fetch mock from jest.setup.js
const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

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

describe('API Integration Tests', () => {
  beforeEach(() => {
    mockFetch.mockClear();
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
    mockLocalStorage.removeItem.mockClear();
  });

  describe('Client-side API (apiFetch)', () => {
    it('should make successful GET request without token', async () => {
      const mockResponse = { data: 'test' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockResponse,
        headers: { get: () => 'application/json' },
      } as any);

      const result = await apiFetch('/test');
      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:4000/test', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });

    it('should include auth token when available', async () => {
      mockLocalStorage.getItem.mockReturnValue('test-token');
      const mockResponse = { data: 'test' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockResponse,
        headers: { get: () => 'application/json' },
      } as any);

      await apiFetch('/test');
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:4000/test', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer test-token',
        },
      });
    });

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(apiFetch('/test')).rejects.toThrow('Network error');
    });

    it('should handle HTTP error responses', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: async () => ({ error: 'Not found' }),
        headers: { get: () => 'application/json' },
      } as any);

      await expect(apiFetch('/test')).rejects.toThrow('Not found');
    });
  });

  describe('Server-side API (serverApiFetch)', () => {
    it('should make successful GET request', async () => {
      const mockResponse = { data: 'test' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockResponse,
        headers: { get: () => 'application/json' },
      } as any);

      const result = await serverApiFetch('/test');
      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:4000/test', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });

    it('should handle server-side errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: async () => ({ error: 'Server error' }),
        headers: { get: () => 'application/json' },
      } as any);

      await expect(serverApiFetch('/test')).rejects.toThrow('Server error');
    });
  });
});

afterAll(() => {
  global.fetch = originalFetch;
});
