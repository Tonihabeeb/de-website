import '@testing-library/jest-dom'

// Mock fetch globally
global.fetch = jest.fn()

// Add TextEncoder polyfill for backend tests
if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util')
  global.TextEncoder = TextEncoder
  global.TextDecoder = TextDecoder
}

// Mock window.alert to prevent console errors
global.alert = jest.fn()

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
    }
  },
}))

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href, ...props }) => {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  }
})

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    img: ({ ...props }) => <img {...props} />,
    svg: ({ children, ...props }) => <svg {...props}>{children}</svg>,
    path: ({ ...props }) => <path {...props} />,
    circle: ({ ...props }) => <circle {...props} />,
    rect: ({ ...props }) => <rect {...props} />,
    line: ({ ...props }) => <line {...props} />,
    polygon: ({ ...props }) => <polygon {...props} />,
    g: ({ children, ...props }) => <g {...props}>{children}</g>,
  },
  AnimatePresence: ({ children }) => children,
  useAnimation: () => ({
    start: jest.fn(),
    stop: jest.fn(),
    set: jest.fn(),
  }),
  useMotionValue: (initial) => ({
    get: () => initial,
    set: jest.fn(),
    on: jest.fn(),
  }),
  useTransform: () => ({
    get: jest.fn(),
    set: jest.fn(),
  }),
  useInView: () => ({
    ref: jest.fn(),
    inView: false,
  }),
  useScroll: () => ({
    scrollX: { get: () => 0 },
    scrollY: { get: () => 0 },
  }),
  useSpring: (value) => ({
    get: () => value,
    set: jest.fn(),
  }),
  useMotionValueEvent: jest.fn(),
  animate: jest.fn(),
  inView: jest.fn(),
  scroll: jest.fn(),
  transform: jest.fn(),
  spring: jest.fn(),
  tween: jest.fn(),
  inertia: jest.fn(),
  keyframes: jest.fn(),
  stagger: jest.fn(),
  delay: jest.fn(),
  easeIn: jest.fn(),
  easeOut: jest.fn(),
  easeInOut: jest.fn(),
  linear: jest.fn(),
  circIn: jest.fn(),
  circOut: jest.fn(),
  circInOut: jest.fn(),
  backIn: jest.fn(),
  backOut: jest.fn(),
  backInOut: jest.fn(),
  anticipate: jest.fn(),
}))


// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock PerformanceObserver
global.PerformanceObserver = class PerformanceObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} 