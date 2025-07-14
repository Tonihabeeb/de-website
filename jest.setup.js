import '@testing-library/jest-dom'

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
  return ({ children, href }) => {
    return <a href={href}>{children}</a>
  }
})

// Mock Framer Motion
jest.mock('framer-motion', () => {
  // Helper function to filter out Framer Motion props
  const filterMotionProps = (props) => {
    const {
      initial,
      animate,
      exit,
      transition,
      variants,
      whileHover,
      whileTap,
      whileInView,
      whileFocus,
      whileDrag,
      drag,
      dragConstraints,
      dragElastic,
      dragMomentum,
      dragPropagation,
      dragSnapToOrigin,
      dragTransition,
      layout,
      layoutId,
      layoutDependency,
      layoutScroll,
      layoutRoot,
      onAnimationStart,
      onAnimationComplete,
      onUpdate,
      onDragStart,
      onDragEnd,
      onDrag,
      onHoverStart,
      onHoverEnd,
      onTap,
      onTapStart,
      onTapCancel,
      onFocus,
      onBlur,
      onViewportEnter,
      onViewportLeave,
      viewport,
      ...filteredProps
    } = props;
    return filteredProps;
  };

  return {
    motion: {
      div: ({ children, ...props }) => <div {...filterMotionProps(props)}>{children}</div>,
      h1: ({ children, ...props }) => <h1 {...filterMotionProps(props)}>{children}</h1>,
      p: ({ children, ...props }) => <p {...filterMotionProps(props)}>{children}</p>,
      span: ({ children, ...props }) => <span {...filterMotionProps(props)}>{children}</span>,
      button: ({ children, ...props }) => <button {...filterMotionProps(props)}>{children}</button>,
    },
    useInView: () => true,
    useScroll: () => ({ scrollYProgress: 0 }),
    useTransform: (value) => value,
    AnimatePresence: ({ children }) => children,
  };
})


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