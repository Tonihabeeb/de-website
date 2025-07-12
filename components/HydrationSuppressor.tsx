'use client';

import { useEffect, useState } from 'react';

interface HydrationSuppressorProps {
  children: React.ReactNode;
}

export default function HydrationSuppressor({ children }: HydrationSuppressorProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    
    // Suppress hydration warnings during development
    if (process.env.NODE_ENV === 'development') {
      const originalError = console.error;
      console.error = (...args) => {
        if (
          args[0]?.includes?.('Hydration failed') || 
          args[0]?.includes?.('Text content does not match') ||
          args[0]?.includes?.('Hydration mismatch')
        ) {
          return;
        }
        originalError.apply(console, args);
      };
    }
  }, []);

  // During SSR and initial hydration, render a minimal version
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 