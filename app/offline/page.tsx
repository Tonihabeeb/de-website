'use client';

import Link from 'next/link';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Offline Icon */}
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
          </svg>
        </div>

        {/* Content */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4">You're Offline</h1>
        <p className="text-gray-600 mb-6">
          It looks like you've lost your internet connection. Don't worry - you can still access some features that we've cached for offline use.
        </p>

        {/* Available Features */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h2 className="font-semibold text-gray-800 mb-3">Available Offline:</h2>
          <ul className="text-base text-gray-600 space-y-2 text-left">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Home page
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Technology overview
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Project information
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Contact forms (will sync when online)
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-200 mobile-button touch-target"
          >
            Try Again
          </button>
          
          <Link
            href="/"
            className="block w-full border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors duration-200 mobile-button touch-target"
          >
            Go to Home
          </Link>
        </div>

        {/* Connection Status */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-base text-gray-600">No internet connection</span>
          </div>
        </div>
      </div>
    </div>
  );
} 