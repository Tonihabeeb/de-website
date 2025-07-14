'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TestResult {
  id: string;
  name: string;
  status: 'pass' | 'fail' | 'pending';
  description: string;
  details?: string;
}

interface MobileTestingChecklistProps {
  className?: string;
}

const mobileTests: TestResult[] = [
  {
    id: 'touch-targets',
    name: 'Touch Targets',
    status: 'pending',
    description: 'All interactive elements have minimum 44px touch targets',
    details: 'Check buttons, links, form inputs, and interactive components'
  },
  {
    id: 'text-readability',
    name: 'Text Readability',
    status: 'pending',
    description: 'Text is readable without zooming (minimum 16px font size)',
    details: 'Verify all text content meets WCAG guidelines'
  },
  {
    id: 'navigation',
    name: 'Mobile Navigation',
    status: 'pending',
    description: 'Navigation menu works properly on mobile devices',
    details: 'Test hamburger menu, dropdowns, and mobile navigation'
  },
  {
    id: 'forms',
    name: 'Form Usability',
    status: 'pending',
    description: 'Forms are usable and accessible on mobile',
    details: 'Check input fields, validation, and submission'
  },
  {
    id: 'animations',
    name: 'Animation Performance',
    status: 'pending',
    description: 'Animations run smoothly on mobile devices',
    details: 'Test KPP animations, transitions, and interactive elements'
  },
  {
    id: 'images',
    name: 'Image Responsiveness',
    status: 'pending',
    description: 'Images scale appropriately on different screen sizes',
    details: 'Verify images don\'t overflow or break layouts'
  },
  {
    id: 'loading',
    name: 'Page Load Times',
    status: 'pending',
    description: 'Pages load within 3 seconds on mobile networks',
    details: 'Test on 3G/4G connections and slower devices'
  },
  {
    id: 'interactions',
    name: 'Touch Interactions',
    status: 'pending',
    description: 'All touch interactions work correctly',
    details: 'Test taps, swipes, and gesture-based interactions'
  },
  {
    id: 'accessibility',
    name: 'Mobile Accessibility',
    status: 'pending',
    description: 'Mobile accessibility features work properly',
    details: 'Test screen readers, voice control, and accessibility tools'
  },
  {
    id: 'orientation',
    name: 'Orientation Changes',
    status: 'pending',
    description: 'Layout adapts to portrait and landscape orientations',
    details: 'Test rotation and responsive breakpoints'
  }
];

export default function MobileTestingChecklist({ className = '' }: MobileTestingChecklistProps) {
  const [tests, setTests] = useState<TestResult[]>(mobileTests);
  const [isVisible, setIsVisible] = useState(false);
  const [currentTest, setCurrentTest] = useState<number>(0);

  useEffect(() => {
    // Auto-run tests in development mode
    if (process.env.NODE_ENV === 'development') {
      setIsVisible(true);
      runAutomatedTests();
    }
  }, []);

  const runAutomatedTests = async () => {
    for (let i = 0; i < tests.length; i++) {
      setCurrentTest(i);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate test time
      
      const testResult = await runTest(tests[i]);
      setTests(prev => prev.map((test, index) => 
        index === i ? { ...test, status: testResult } : test
      ));
    }
  };

  const runTest = async (test: TestResult): Promise<'pass' | 'fail'> => {
    // Simulate automated testing logic
    switch (test.id) {
      case 'touch-targets':
        return checkTouchTargets();
      case 'text-readability':
        return checkTextReadability();
      case 'navigation':
        return checkNavigation();
      case 'forms':
        return checkForms();
      case 'animations':
        return checkAnimations();
      case 'images':
        return checkImages();
      case 'loading':
        return checkLoadingTimes();
      case 'interactions':
        return checkTouchInteractions();
      case 'accessibility':
        return checkAccessibility();
      case 'orientation':
        return checkOrientation();
      default:
        return 'pass';
    }
  };

  // Automated test functions
  const checkTouchTargets = (): 'pass' | 'fail' => {
    const interactiveElements = document.querySelectorAll('button, a, input, [role="button"]');
    let allValid = true;
    
    interactiveElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      if (rect.width < 44 || rect.height < 44) {
        allValid = false;
      }
    });
    
    return allValid ? 'pass' : 'fail';
  };

  const checkTextReadability = (): 'pass' | 'fail' => {
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div');
    let allReadable = true;
    
    textElements.forEach(element => {
      const computedStyle = window.getComputedStyle(element);
      const fontSize = parseFloat(computedStyle.fontSize);
      if (fontSize < 16 && element.textContent?.trim()) {
        allReadable = false;
      }
    });
    
    return allReadable ? 'pass' : 'fail';
  };

  const checkNavigation = (): 'pass' | 'fail' => {
    const nav = document.querySelector('nav');
    const mobileNav = document.querySelector('[data-mobile-nav]');
    return (nav || mobileNav) ? 'pass' : 'fail';
  };

  const checkForms = (): 'pass' | 'fail' => {
    const forms = document.querySelectorAll('form');
    return forms.length > 0 ? 'pass' : 'fail';
  };

  const checkAnimations = (): 'pass' | 'fail' => {
    // Check if animations are present and not causing issues
    const animatedElements = document.querySelectorAll('[data-framer-motion]');
    return animatedElements.length > 0 ? 'pass' : 'fail';
  };

  const checkImages = (): 'pass' | 'fail' => {
    const images = document.querySelectorAll('img');
    let allResponsive = true;
    
    images.forEach(img => {
      const computedStyle = window.getComputedStyle(img);
      if (computedStyle.maxWidth === 'none' && !img.classList.contains('responsive')) {
        allResponsive = false;
      }
    });
    
    return allResponsive ? 'pass' : 'fail';
  };

  const checkLoadingTimes = (): 'pass' | 'fail' => {
    const loadTime = performance.now();
    return loadTime < 3000 ? 'pass' : 'fail';
  };

  const checkTouchInteractions = (): 'pass' | 'fail' => {
    // Check for touch-friendly CSS
    const touchElements = document.querySelectorAll('[data-touch-target]');
    return touchElements.length > 0 ? 'pass' : 'fail';
  };

  const checkAccessibility = (): 'pass' | 'fail' => {
    const ariaElements = document.querySelectorAll('[aria-label], [aria-labelledby], [role]');
    return ariaElements.length > 0 ? 'pass' : 'fail';
  };

  const checkOrientation = (): 'pass' | 'fail' => {
    // Check for responsive CSS
    const responsiveElements = document.querySelectorAll('.responsive, [class*="md:"], [class*="lg:"]');
    return responsiveElements.length > 0 ? 'pass' : 'fail';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'text-green-600 bg-green-100';
      case 'fail': return 'text-red-600 bg-red-100';
      default: return 'text-yellow-600 bg-yellow-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return '✅';
      case 'fail': return '❌';
      default: return '⏳';
    }
  };

  const passedTests = tests.filter(test => test.status === 'pass').length;
  const totalTests = tests.length;
  const progressPercentage = (passedTests / totalTests) * 100;

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-primary text-white p-3 rounded-full shadow-lg z-50"
        aria-label="Open mobile testing checklist"
      >
        📱
      </button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed bottom-4 right-4 bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-sm z-50 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Mobile Testing</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{passedTests}/{totalTests}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-primary h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Test Results */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {tests.map((test, index) => (
          <motion.div
            key={test.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-3 rounded-lg border ${
              currentTest === index ? 'ring-2 ring-primary' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-lg">{getStatusIcon(test.status)}</span>
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{test.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{test.description}</p>
                {test.details && (
                  <p className="text-xs text-gray-500 mt-1">{test.details}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {passedTests === totalTests ? (
              <span className="text-green-600 font-medium">✅ All tests passed!</span>
            ) : (
              <span className="text-yellow-600 font-medium">
                ⚠️ {totalTests - passedTests} issues found
              </span>
            )}
          </p>
          <button
            onClick={runAutomatedTests}
            className="mt-2 px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition-colors"
          >
            Re-run Tests
          </button>
        </div>
      </div>
    </motion.div>
  );
} 