'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: '',
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Generate a unique error ID for tracking
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    return {
      hasError: true,
      error,
      errorInfo: null,
      errorId,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error to console for development
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // In production, you would send this to your error reporting service
    // Example: Sentry, LogRocket, etc.
    this.reportError(error, errorInfo);
  }

  reportError = (error: Error, errorInfo: ErrorInfo) => {
    // This is where you would send the error to your error reporting service
    // For now, we'll just log it
    const errorReport = {
      errorId: this.state.errorId,
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    console.log('Error Report:', errorReport);

    // TODO: Connect to a real error reporting service (e.g., Sentry, LogRocket, or your backend API)
    // Example: Send to your backend API
    // fetch('/api/errors', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(errorReport),
    // }).catch(console.error);
  };

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: '',
    });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleGoBack = () => {
    window.history.back();
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4'>
          <div className='max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center'>
            <div className='mb-6'>
              <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4'>
                <AlertTriangle className='h-6 w-6 text-red-600' />
              </div>
              <h1 className='text-xl font-semibold text-gray-900 mb-2'>
                Something went wrong
              </h1>
              <p className='text-gray-600 mb-6'>
                We're sorry, but something unexpected happened. Our team has
                been notified and is working to fix this issue.
              </p>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className='mb-6 text-left'>
                  <summary className='cursor-pointer text-sm font-medium text-gray-700 mb-2'>
                    Error Details (Development)
                  </summary>
                  <div className='bg-gray-100 p-4 rounded text-xs font-mono text-gray-800 overflow-auto max-h-40'>
                    <div className='mb-2'>
                      <strong>Error ID:</strong> {this.state.errorId}
                    </div>
                    <div className='mb-2'>
                      <strong>Message:</strong> {this.state.error.message}
                    </div>
                    <div className='mb-2'>
                      <strong>Stack:</strong>
                      <pre className='whitespace-pre-wrap mt-1'>
                        {this.state.error.stack}
                      </pre>
                    </div>
                    {this.state.errorInfo && (
                      <div>
                        <strong>Component Stack:</strong>
                        <pre className='whitespace-pre-wrap mt-1'>
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              )}
            </div>

            <div className='space-y-3'>
              <button
                onClick={this.handleRetry}
                className='w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors'
              >
                <RefreshCw className='h-4 w-4 mr-2' />
                Try Again
              </button>

              <div className='flex space-x-3'>
                <button
                  onClick={this.handleGoBack}
                  className='flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors'
                >
                  <ArrowLeft className='h-4 w-4 mr-2' />
                  Go Back
                </button>

                <button
                  onClick={this.handleGoHome}
                  className='flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors'
                >
                  <Home className='h-4 w-4 mr-2' />
                  Go Home
                </button>
              </div>
            </div>

            {this.state.errorId && (
              <div className='mt-6 pt-4 border-t border-gray-200'>
                <p className='text-xs text-gray-500'>
                  Error ID: {this.state.errorId}
                </p>
                <p className='text-xs text-gray-500 mt-1'>
                  If this problem persists, please contact support with this
                  error ID.
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
