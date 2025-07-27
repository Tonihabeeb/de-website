// Mock media data and @/utils/api before any imports
const mockMedia = [
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
];

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

jest.mock('@/utils/api', () => ({
  apiFetch: jest.fn(() => Promise.resolve({ media: mockMedia })),
  ApiException: class ApiException extends Error {},
}));

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import DocumentList from '@/components/documents/DocumentList';

describe('Minimal DocumentList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders DocumentList and waits for document names to appear', async () => {
    render(<DocumentList />);
    await waitFor(() => {
      expect(screen.queryByText('Loading documents...')).not.toBeInTheDocument();
    });
    await screen.findByText('Project Report.pdf');
    await screen.findByText('Technical Specs.docx');
  });
});
