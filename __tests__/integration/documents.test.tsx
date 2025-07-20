import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';

// Mock the AuthContext to provide authenticated user
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    isAuthenticated: true,
    user: {
      id: 'test-user-id',
      name: 'Test User',
      email: 'test@example.com',
      role: 'user'
    },
    login: jest.fn(),
    logout: jest.fn(),
    hasRole: jest.fn(() => true),
    hasAnyRole: jest.fn(() => true),
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

// Mock the API utility BEFORE importing the components
jest.mock('@/utils/api', () => ({
  apiFetch: jest.fn(),
  ApiException: class ApiException extends Error {
    constructor(message: string, public status: number) {
      super(message);
      this.name = 'ApiException';
    }
  }
}));

// Import after mocking
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/components/ui/Toast';
import DocumentUpload from '@/components/documents/DocumentUpload';
import DocumentList from '@/components/documents/DocumentList';
import { apiFetch } from '@/utils/api';

// Mock fetch globally to prevent real API calls
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock File API
const createMockFile = (name: string, size: number, type: string) => {
  const file = new File(['test content'], name, { type });
  Object.defineProperty(file, 'size', { value: size });
  return file;
};

// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => 'mock-url');
global.URL.revokeObjectURL = jest.fn();

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

// Mock data
const mockDocuments = [
  {
    _id: '1',
    title: 'Project Report',
    description: 'Technical project report',
    filename: 'project-report.pdf',
    originalName: 'Project Report.pdf',
    mimetype: 'application/pdf',
    size: 1024000,
    category: 'project',
    type: 'document',
    uploadedBy: {
      _id: 'user1',
      name: 'Test User',
      email: 'test@example.com'
    },
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    _id: '2',
    title: 'Technical Specifications',
    description: 'System specifications',
    filename: 'tech-specs.docx',
    originalName: 'Technical Specs.docx',
    mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    size: 2048000,
    category: 'technical',
    type: 'document',
    uploadedBy: {
      _id: 'user1',
      name: 'Test User',
      email: 'test@example.com'
    },
    createdAt: '2024-01-02T00:00:00.000Z',
    updatedAt: '2024-01-02T00:00:00.000Z'
  }
];

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    <ToastProvider>
      {children}
    </ToastProvider>
  </AuthProvider>
);

describe('Document Management Integration Tests', () => {
  const mockApiFetch = apiFetch as jest.MockedFunction<typeof apiFetch>;

  beforeAll(() => {
    // Set up environment variables for tests
    process.env.NEXT_PUBLIC_API_BASE_URL = 'http://localhost:3000';
  });

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    mockFetch.mockClear();
    mockApiFetch.mockClear();
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
    mockLocalStorage.removeItem.mockClear();
    
    // Mock successful authentication
    mockLocalStorage.getItem.mockReturnValue('mock-token');
    
    // Reset fetch mock to prevent real API calls
    mockFetch.mockImplementation(() => {
      throw new Error('Real fetch calls are not allowed in tests');
    });
  });

  afterEach(() => {
    // Clean up after each test
    jest.clearAllMocks();
  });

  afterAll(() => {
    // Clean up environment variables
    delete process.env.NEXT_PUBLIC_API_BASE_URL;
  });

  describe('DocumentUpload Component', () => {
    it('should render upload form', () => {
      render(
        <TestWrapper>
          <DocumentUpload />
        </TestWrapper>
      );

      // Check for form fields
      expect(screen.getByLabelText(/document title/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/type/i)).toBeInTheDocument();
      
      // Check for upload area
      expect(screen.getByText('Drop files here or click to browse')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /choose files/i })).toBeInTheDocument();
    });

    it('should handle file selection', async () => {
      render(
        <TestWrapper>
          <DocumentUpload />
        </TestWrapper>
      );

      const chooseFilesButton = screen.getByRole('button', { name: /choose files/i });
      const file = createMockFile('test.pdf', 1024, 'application/pdf');

      await act(async () => {
        fireEvent.click(chooseFilesButton);
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) {
          fireEvent.change(fileInput, { target: { files: [file] } });
        }
      });

      await waitFor(() => {
        expect(screen.getByText('test.pdf')).toBeInTheDocument();
      });
    });

    it('should handle form submission', async () => {
      // Mock successful upload response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'Document uploaded successfully' })
      });

      render(
        <TestWrapper>
          <DocumentUpload />
        </TestWrapper>
      );

      const titleInput = screen.getByLabelText(/document title/i);
      const descriptionInput = screen.getByLabelText(/description/i);
      const chooseFilesButton = screen.getByRole('button', { name: /choose files/i });
      const file = createMockFile('test.pdf', 1024, 'application/pdf');

      await act(async () => {
        // Fill in form fields
        fireEvent.change(titleInput, { target: { value: 'Test Document' } });
        fireEvent.change(descriptionInput, { target: { value: 'Test description' } });
        
        // Select file
        fireEvent.click(chooseFilesButton);
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) {
          fireEvent.change(fileInput, { target: { files: [file] } });
        }
      });

      // Wait for file to appear in list
      await waitFor(() => {
        expect(screen.getByText('test.pdf')).toBeInTheDocument();
      });

      // Click the upload button
      const uploadButton = screen.getByRole('button', { name: /upload documents/i });
      
      await act(async () => {
        fireEvent.click(uploadButton);
      });

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('http://localhost:3000/api/documents', expect.any(Object));
      });
    });

    it('should handle upload errors', async () => {
      // Mock failed upload response
      mockFetch.mockRejectedValueOnce(new Error('Upload failed'));

      render(
        <TestWrapper>
          <DocumentUpload />
        </TestWrapper>
      );

      const chooseFilesButton = screen.getByRole('button', { name: /choose files/i });
      const file = createMockFile('test.pdf', 1024, 'application/pdf');

      await act(async () => {
        // Select file
        fireEvent.click(chooseFilesButton);
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) {
          fireEvent.change(fileInput, { target: { files: [file] } });
        }
      });

      // Wait for file to appear in list
      await waitFor(() => {
        expect(screen.getByText('test.pdf')).toBeInTheDocument();
      });

      // Click the upload button
      const uploadButton = screen.getByRole('button', { name: /upload documents/i });
      
      await act(async () => {
        fireEvent.click(uploadButton);
      });

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalled();
      });
    });
  });

  describe('DocumentList Component', () => {
    it('should render document list', async () => {
      // Mock successful documents fetch
      mockApiFetch.mockResolvedValueOnce({ documents: mockDocuments });

      await act(async () => {
        render(
          <TestWrapper>
            <DocumentList />
          </TestWrapper>
        );
      });

      await waitFor(() => {
        expect(screen.getByText('Project Report')).toBeInTheDocument();
        expect(screen.getByText('Technical Specifications')).toBeInTheDocument();
      });
    });

    it('should handle search functionality', async () => {
      // Mock successful documents fetch
      mockApiFetch.mockResolvedValueOnce({ documents: mockDocuments });

      await act(async () => {
        render(
          <TestWrapper>
            <DocumentList />
          </TestWrapper>
        );
      });

      await waitFor(() => {
        expect(screen.getByText('Project Report')).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText(/search documents/i);
      
      await act(async () => {
        fireEvent.change(searchInput, { target: { value: 'Project' } });
      });

      await waitFor(() => {
        expect(screen.getByText('Project Report')).toBeInTheDocument();
        expect(screen.queryByText('Technical Specifications')).not.toBeInTheDocument();
      });
    });

    it('should handle empty state', async () => {
      // Mock empty documents response
      mockApiFetch.mockResolvedValueOnce({ documents: [] });

      await act(async () => {
        render(
          <TestWrapper>
            <DocumentList />
          </TestWrapper>
        );
      });

      await waitFor(() => {
        expect(screen.getByText(/no documents found/i)).toBeInTheDocument();
      });
    });

    it('should handle error state', async () => {
      // Mock failed documents fetch
      mockApiFetch.mockRejectedValueOnce(new Error('Failed to fetch documents'));

      await act(async () => {
        render(
          <TestWrapper>
            <DocumentList />
          </TestWrapper>
        );
      });

      await waitFor(() => {
        expect(screen.getByText(/error loading documents/i)).toBeInTheDocument();
      });
    });

    it('should handle document download', async () => {
      // Mock successful documents fetch
      mockApiFetch.mockResolvedValueOnce({ documents: mockDocuments });

      // Mock successful download
      mockFetch.mockResolvedValueOnce({
        ok: true,
        blob: async () => new Blob(['test content'])
      });

      await act(async () => {
        render(
          <TestWrapper>
            <DocumentList />
          </TestWrapper>
        );
      });

      await waitFor(() => {
        expect(screen.getByText('Project Report')).toBeInTheDocument();
      });

      const downloadButton = screen.getAllByRole('button', { name: /download/i })[0];
      
      await act(async () => {
        fireEvent.click(downloadButton);
      });

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('http://localhost:3000/api/documents/1/download', expect.any(Object));
      });
    });
  });
}); 