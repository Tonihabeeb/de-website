'use client';

import { useEffect, useState } from 'react';
import { MonitorSmartphone, X as LucideX } from 'lucide-react';

export default function PWARegistration() {
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then(registration => {
            if (process.env.NODE_ENV === 'development') {
              console.log('SW registered: ', registration);
            }
          })
          .catch(registrationError => {
            if (process.env.NODE_ENV === 'development') {
              console.log('SW registration failed: ', registrationError);
            }
          });
      });
    }

    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    });

    // Listen for online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Set initial online status
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        if (process.env.NODE_ENV === 'development') {
          console.log('User accepted the install prompt');
        }
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.log('User dismissed the install prompt');
        }
      }

      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  };

  const handleDismissInstall = () => {
    setIsInstallable(false);
    setDeferredPrompt(null);
  };

  return (
    <>
      {/* PWA Install Prompt */}
      {isInstallable && (
        <div className='fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50'>
          <div className='flex items-start space-x-3'>
            <div className='flex-shrink-0'>
              <div className='w-10 h-10 bg-primary rounded-lg flex items-center justify-center'>
                <MonitorSmartphone className='w-6 h-6 text-white' />
              </div>
            </div>
            <div className='flex-1 min-w-0'>
              <h3 className='text-base font-medium text-gray-900'>
                Install Deep Engineering
              </h3>
              <p className='text-base text-gray-600 mt-1'>
                Add to your home screen for quick access.
              </p>
            </div>
            <button
              onClick={handleDismissInstall}
              className='flex-shrink-0 text-gray-600 hover:text-gray-600 touch-target min-w-[44px] min-h-[44px]'
              aria-label='Dismiss install prompt'
            >
              <LucideX className='w-5 h-5' />
            </button>
          </div>
          <div className='mt-3 flex space-x-2'>
            <button
              onClick={handleInstallClick}
              className='flex-1 bg-primary text-white px-3 py-2 rounded-md text-base font-medium hover:bg-primary-dark transition-colors duration-200 touch-target min-w-[44px] min-h-[44px]'
            >
              Install
            </button>
            <button
              onClick={handleDismissInstall}
              className='flex-1 border border-gray-300 text-gray-700 px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50 transition-colors duration-200 touch-target min-w-[44px] min-h-[44px]'
            >
              Not Now
            </button>
          </div>
        </div>
      )}

      {/* Connection Status Indicator */}
      {!isOnline && (
        <div className='fixed top-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-yellow-50 border border-yellow-200 rounded-lg p-3 z-50'>
          <div className='flex items-center space-x-2'>
            <div className='w-2 h-2 bg-yellow-500 rounded-full animate-pulse'></div>
            <span className='text-base text-yellow-800'>
              You're offline. Some features may be limited.
            </span>
          </div>
        </div>
      )}
    </>
  );
}
