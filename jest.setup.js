// jest.setup.js
// Add jest-dom custom matchers
require('@testing-library/jest-dom');
// Mock IntersectionObserver for jsdom environment
class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.IntersectionObserver = IntersectionObserver;

// Mock window.matchMedia for tests that use it (e.g., HeroSection)
if (!window.matchMedia) {
  window.matchMedia = function (query) {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };
  };
} 