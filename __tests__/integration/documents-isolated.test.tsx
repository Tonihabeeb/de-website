// Add debug log and reset modules before any imports
console.log('[DEBUG] test file start');

jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    isAuthenticated: true,
    user: {
      id: 'test',
      name: 'Test',
      email: 'test@example.com',
      role: 'admin',
    },
    login: jest.fn(),
    logout: jest.fn(),
    hasRole: jest.fn(() => true),
    hasAnyRole: jest.fn(() => true),
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// import React from 'react';
// import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
// import { AuthProvider } from '@/contexts/AuthContext';
// import { ToastProvider } from '@/components/ui/Toast';
// import DocumentUpload from '@/components/documents/DocumentUpload';
import DocumentList from '@/components/documents/DocumentList';
// import { apiFetch as _apiFetch } from '@/utils/api';
// const apiFetch = _apiFetch as jest.Mock;

// Mock fetch globally to prevent real API calls
// const mockFetch = jest.fn();
// global.fetch = mockFetch;

// Mock File API
// const createMockFile = (name: string, size: number, type: string) => {
//   const file = new File(['test content'], name, { type });
//   Object.defineProperty(file, 'size', { value: size });
//   return file;
// };

// Mock URL.createObjectURL
// global.URL.createObjectURL = jest.fn(() => 'mock-url');
// global.URL.revokeObjectURL = jest.fn();

// Mock localStorage
// const mockLocalStorage = {
//   getItem: jest.fn(),
//   setItem: jest.fn(),
//   removeItem: jest.fn(),
//   clear: jest.fn(),
// };
// Object.defineProperty(window, 'localStorage', {
//   value: mockLocalStorage,
// });

// Update mock data to match media API
// const mockMedia = [
//   {
//     id: '1',
//     filename: 'project-report.pdf',
//     original_name: 'Project Report.pdf',
//     file_path: '/uploads/project-report.pdf',
//     file_size: 1024000,
//     mime_type: 'application/pdf',
//     alt_text: 'Project Report',
//     caption: 'Technical project report',
//     tags: ['project'],
//     uploaded_by: 'user1',
//     created_at: '2024-01-01T00:00:00.000Z',
//     updated_at: '2024-01-01T00:00:00.000Z',
//   },
//   {
//     id: '2',
//     filename: 'tech-specs.docx',
//     original_name: 'Technical Specs.docx',
//     file_path: '/uploads/tech-specs.docx',
//     file_size: 2048000,
//     mime_type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//     alt_text: 'Technical Specifications',
//     caption: 'System specifications',
//     tags: ['technical'],
//     uploaded_by: 'user1',
//     created_at: '2024-01-02T00:00:00.000Z',
//     updated_at: '2024-01-02T00:00:00.000Z',
//   },
// ];

// const TestWrapper = ({ children }: { children: React.ReactNode }) => (
//   <AuthProvider>
//     <ToastProvider>{children}</ToastProvider>
//   </AuthProvider>
// );

// Increase Jest timeout for slow async UI tests
// jest.setTimeout(20000);

// Reset modules before each test to ensure fresh mocks
// beforeEach(() => {
//   // Remove jest.resetModules() from the top and beforeEach
// });

import { render, screen, waitFor } from '@testing-library/react';

jest.mock('@/utils/api', () => ({
  apiFetch: jest.fn(() =>
    Promise.resolve({
      media: [
        {
          id: '1',
          filename: 'project-report.pdf',
          original_name: 'Project Report.pdf',
          file_path: '/uploads/project-report.pdf',
          file_size: 1024000,
          mime_type: 'application/pdf',
          alt_text: 'Project Report',
          caption: 'Technical project report',
          tags: ['project'],
          uploaded_by: 'user1',
          created_at: '2024-01-01T00:00:00.000Z',
          updated_at: '2024-01-01T00:00:00.000Z',
        },
        {
          id: '2',
          filename: 'tech-specs.docx',
          original_name: 'Technical Specs.docx',
          file_path: '/uploads/tech-specs.docx',
          file_size: 2048000,
          mime_type:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          alt_text: 'Technical Specifications',
          caption: 'System specifications',
          tags: ['technical'],
          uploaded_by: 'user1',
          created_at: '2024-01-02T00:00:00.000Z',
          updated_at: '2024-01-02T00:00:00.000Z',
        },
      ],
    })
  ),
  ApiException: class ApiException extends Error {},
}));

test('renders DocumentList and waits for loading spinner to disappear', async () => {
  render(<DocumentList />);
  await waitFor(() => {
    expect(screen.queryByText('Loading documents...')).not.toBeInTheDocument();
  });
  expect(screen.getByText('Project Report.pdf')).toBeInTheDocument();
  expect(screen.getByText('Technical Specs.docx')).toBeInTheDocument();
});
