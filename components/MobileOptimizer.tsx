'use client';

import { useEffect, useState } from 'react';

interface MobileOptimizationConfig {
  touchTargetSize: number;
  minFontSize: number;
  maxContentWidth: number;
  breakpoints: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}

const defaultConfig: MobileOptimizationConfig = {
  touchTargetSize: 44, // Minimum touch target size in pixels
  minFontSize: 16, // Minimum font size for readability
  maxContentWidth: 1200, // Maximum content width
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: 1200,
  },
};

export default function MobileOptimizer() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [touchSupport, setTouchSupport] = useState(false);

  useEffect(() => {
    const checkDeviceCapabilities = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setScreenSize({ width, height });
      setIsMobile(width < defaultConfig.breakpoints.mobile);
      setIsTablet(
        width >= defaultConfig.breakpoints.mobile &&
          width < defaultConfig.breakpoints.tablet
      );
      setTouchSupport('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };

    checkDeviceCapabilities();
    window.addEventListener('resize', checkDeviceCapabilities);

    return () => window.removeEventListener('resize', checkDeviceCapabilities);
  }, []);

  // Apply mobile-specific CSS classes
  useEffect(() => {
    const root = document.documentElement;

    if (isMobile) {
      root.classList.add('mobile-device');
      root.classList.remove('tablet-device', 'desktop-device');
    } else if (isTablet) {
      root.classList.add('tablet-device');
      root.classList.remove('mobile-device', 'desktop-device');
    } else {
      root.classList.add('desktop-device');
      root.classList.remove('mobile-device', 'tablet-device');
    }

    if (touchSupport) {
      root.classList.add('touch-device');
    } else {
      root.classList.add('no-touch-device');
    }
  }, [isMobile, isTablet, touchSupport]);

  return null; // This component doesn't render anything visible
}

// Mobile optimization utilities
export const mobileUtils = {
  // Ensure touch targets are large enough
  getTouchTargetSize: (baseSize: number = 44) => {
    return Math.max(baseSize, defaultConfig.touchTargetSize);
  },

  // Get responsive font size
  getResponsiveFontSize: (baseSize: number, mobileMultiplier: number = 0.9) => {
    if (
      typeof window !== 'undefined' &&
      window.innerWidth < defaultConfig.breakpoints.mobile
    ) {
      return Math.max(baseSize * mobileMultiplier, defaultConfig.minFontSize);
    }
    return baseSize;
  },

  // Check if device supports touch
  isTouchDevice: () => {
    if (typeof window === 'undefined') return false;
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  },

  // Get device type
  getDeviceType: () => {
    if (typeof window === 'undefined') return 'desktop';
    const width = window.innerWidth;

    if (width < defaultConfig.breakpoints.mobile) return 'mobile';
    if (width < defaultConfig.breakpoints.tablet) return 'tablet';
    return 'desktop';
  },

  // Optimize images for mobile
  getOptimizedImageSize: (originalSize: number) => {
    const deviceType = mobileUtils.getDeviceType();

    switch (deviceType) {
      case 'mobile':
        return Math.min(originalSize, 400);
      case 'tablet':
        return Math.min(originalSize, 600);
      default:
        return originalSize;
    }
  },
};
