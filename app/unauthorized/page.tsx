'use client';

import Link from 'next/link';
import { AlertTriangle, Shield, Home, ArrowLeft } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full mx-auto p-8'>
        <div className='text-center'>
          <div className='flex justify-center mb-6'>
            <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center'>
              <AlertTriangle className='w-8 h-8 text-red-600' />
            </div>
          </div>

          <h1 className='text-2xl font-bold text-gray-900 mb-4'>
            Access Denied
          </h1>

          <p className='text-gray-600 mb-8'>
            You don't have permission to access this page. Please contact your
            administrator if you believe this is an error.
          </p>

          <div className='space-y-4'>
            <Link
              href='/'
              className='w-full flex items-center justify-center px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors'
            >
              <Home className='w-4 h-4 mr-2' />
              Go to Homepage
            </Link>

            <button
              onClick={() => window.history.back()}
              className='w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'
            >
              <ArrowLeft className='w-4 h-4 mr-2' />
              Go Back
            </button>
          </div>

          <div className='mt-8 pt-6 border-t border-gray-200'>
            <div className='flex items-center justify-center text-sm text-gray-500'>
              <Shield className='w-4 h-4 mr-2' />
              Deep Engineering Security
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
