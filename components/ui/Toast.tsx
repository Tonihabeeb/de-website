'use client';

import React from 'react';
import { Toaster as SonnerToaster } from 'sonner';

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  return (
    <>
      {children}
      <SonnerToaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'white',
            color: '#374151',
            border: '1px solid #e5e7eb',
          },
        }}
      />
    </>
  );
};

// Utility functions for easy toast usage
export const toast = {
  success: (message: string) => {
    if (typeof window !== 'undefined') {
      import('sonner').then(({ toast }) => toast.success(message));
    }
  },
  error: (message: string) => {
    if (typeof window !== 'undefined') {
      import('sonner').then(({ toast }) => toast.error(message));
    }
  },
  warning: (message: string) => {
    if (typeof window !== 'undefined') {
      import('sonner').then(({ toast }) => toast.warning(message));
    }
  },
  info: (message: string) => {
    if (typeof window !== 'undefined') {
      import('sonner').then(({ toast }) => toast.info(message));
    }
  },
};

export default ToastProvider; 