'use client';

import { useEffect } from 'react';

export default function BrowserExtensionHandler() {
  useEffect(() => {
    // Remove browser extension injected elements that cause hydration mismatches
    const removeExtensionElements = () => {
      // Common browser extension selectors that cause hydration issues
      const extensionSelectors = [
        '[id*="extwaiokist"]',
        '[id*="extension"]',
        '[class*="extension"]',
        '[data-extension]',
        '[v]', // Elements with v attribute (common in extensions)
        '[q]', // Elements with q attribute (common in extensions)
      ];

      extensionSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          if (element.parentNode) {
            element.parentNode.removeChild(element);
          }
        });
      });
    };

    // Run immediately
    removeExtensionElements();

    // Set up a mutation observer to watch for new injections
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              const extensionSelectors = [
                '[id*="extwaiokist"]',
                '[id*="extension"]',
                '[class*="extension"]',
                '[data-extension]',
                '[v]',
                '[q]',
              ];

              extensionSelectors.forEach(selector => {
                if (element.matches(selector) || element.querySelector(selector)) {
                  if (element.parentNode) {
                    element.parentNode.removeChild(element);
                  }
                }
              });
            }
          });
        }
      });
    });

    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
} 