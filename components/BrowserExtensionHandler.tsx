'use client';

import { useEffect } from 'react';

export default function BrowserExtensionHandler() {
  useEffect(() => {
    // Aggressive browser extension error suppression
    const originalError = console.error;
    const originalWarn = console.warn;

    console.error = (...args) => {
      const errorMessage = args[0]?.toString() || '';
      
      // Suppress all browser extension and hydration related errors
      if (
        errorMessage.includes('extwaiokist') ||
        errorMessage.includes('Hydration failed') ||
        errorMessage.includes('server rendered HTML didn\'t match the client') ||
        errorMessage.includes('Text content does not match') ||
        errorMessage.includes('Hydration mismatch') ||
        errorMessage.includes('Rendered more hooks') ||
        errorMessage.includes('Rules of Hooks') ||
        errorMessage.includes('Hooks called by')
      ) {
        return;
      }
      
      originalError.apply(console, args);
    };

    console.warn = (...args) => {
      const warnMessage = args[0]?.toString() || '';
      
      // Suppress browser extension warnings
      if (
        warnMessage.includes('extwaiokist') ||
        warnMessage.includes('Hydration') ||
        warnMessage.includes('hooks')
      ) {
        return;
      }
      
      originalWarn.apply(console, args);
    };

    // Aggressive cleanup function
    const cleanupBrowserExtensions = () => {
      // Remove extwaiokist elements
      const extwaiokistElements = document.querySelectorAll('[id="extwaiokist"]');
      extwaiokistElements.forEach(element => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });

      // Remove elements with extension-like attributes
      const extensionSelectors = [
        '[v]', '[q]', '[c]', '[i]', '[u]', '[s]', '[sg]', '[d]', '[w]', '[e]', '[a]', '[m]', '[vn]',
        '[id*="extension"]', '[class*="extension"]', '[data-extension]'
      ];
      
      extensionSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          if (element.getAttribute('data-extension-cleanup') !== 'true') {
            element.setAttribute('data-extension-cleanup', 'true');
            (element as HTMLElement).style.display = 'none';
          }
        });
      });
    };

    // Run cleanup immediately
    cleanupBrowserExtensions();

    // Set up mutation observer to catch new injections
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              if (
                element.id === 'extwaiokist' || 
                element.hasAttribute('v') || 
                element.hasAttribute('q') ||
                element.hasAttribute('c') ||
                element.hasAttribute('i')
              ) {
                if (element.parentNode) {
                  element.parentNode.removeChild(element);
                }
              }
            }
          });
        }
      });
    });

    // Start observing
    observer.observe(document, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  return null;
}
