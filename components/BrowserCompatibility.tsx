'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';

export default function BrowserCompatibility() {
  const [compatibility, setCompatibility] = useState({
    clipboard: false,
    webGL: false,
    serviceWorker: false,
    isSupported: true,
  });

  useEffect(() => {
    // Check browser compatibility
    const checks = {
      clipboard: !!(
        navigator.clipboard || document.queryCommandSupported?.('copy')
      ),
      webGL: !!window.WebGLRenderingContext,
      serviceWorker: 'serviceWorker' in navigator,
    };

    const isSupported =
      checks.clipboard && checks.webGL && checks.serviceWorker;

    setCompatibility({
      ...checks,
      isSupported,
    });

    // Log compatibility info for debugging
    if (!isSupported) {
      console.warn('Browser compatibility issues detected:', checks);
    }
  }, []);

  // Only show warning if there are compatibility issues
  if (compatibility.isSupported) {
    return null;
  }

  return (
    <div className='fixed bottom-4 right-4 z-50 max-w-sm'>
      <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-lg'>
        <div className='flex items-start'>
          <AlertTriangle className='w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0' />
          <div className='flex-1'>
            <h3 className='text-sm font-medium text-yellow-800'>
              Browser Compatibility Notice
            </h3>
            <div className='mt-2 text-xs text-yellow-700 space-y-1'>
              {!compatibility.clipboard && (
                <div className='flex items-center'>
                  <span className='w-2 h-2 bg-yellow-400 rounded-full mr-2'></span>
                  Copy functionality may not work
                </div>
              )}
              {!compatibility.webGL && (
                <div className='flex items-center'>
                  <span className='w-2 h-2 bg-yellow-400 rounded-full mr-2'></span>
                  Some animations may be limited
                </div>
              )}
              {!compatibility.serviceWorker && (
                <div className='flex items-center'>
                  <span className='w-2 h-2 bg-yellow-400 rounded-full mr-2'></span>
                  Offline features unavailable
                </div>
              )}
            </div>
            <p className='mt-2 text-xs text-yellow-600'>
              Consider using a modern browser for the best experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
