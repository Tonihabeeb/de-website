/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Heebo', 'sans-serif'],
      serif: ['Crimson Pro', 'serif'],
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#18335A', // Deep blue from logo
          dark: '#152D47',
          light: '#2150FE', // Bright accent blue
        },
        accent: {
          DEFAULT: '#2150FE',
          warm: '#C84209', // Warm orange accent
        },
        gray: {
          text: '#4C4C4D',
          light: '#F0F0F1',
        }
      },
      fontSize: {
        'hero': ['4rem', { lineHeight: '1.1' }],
        'hero-lg': ['6rem', { lineHeight: '1.1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'spin-slow-reverse': 'spin 15s linear infinite reverse',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'pulse-delayed': 'pulse 3s ease-in-out infinite 1s',
        'ping-slow': 'ping 4s ease-in-out infinite',
        'float-1': 'float 6s ease-in-out infinite',
        'float-1-delayed': 'float 6s ease-in-out infinite 1s',
        'float-2': 'float 8s ease-in-out infinite 2s',
        'float-2-delayed': 'float 8s ease-in-out infinite 3s',
        'float-3': 'float 7s ease-in-out infinite 1.5s',
        'float-3-delayed': 'float 7s ease-in-out infinite 2.5s',
        'float-4': 'float 9s ease-in-out infinite 3s',
        'float-4-delayed': 'float 9s ease-in-out infinite 4s',
        'pulse-expand-1': 'pulse-expand 4s ease-in-out infinite',
        'pulse-expand-1-delayed': 'pulse-expand 4s ease-in-out infinite 1s',
        'pulse-expand-2': 'pulse-expand 5s ease-in-out infinite 2s',
        'pulse-expand-2-delayed': 'pulse-expand 5s ease-in-out infinite 3s',
        'pulse-expand-3': 'pulse-expand 6s ease-in-out infinite 1.5s',
        'pulse-expand-3-delayed': 'pulse-expand 6s ease-in-out infinite 2.5s',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '25%': { transform: 'translateY(-20px) translateX(10px)' },
          '50%': { transform: 'translateY(-10px) translateX(-15px)' },
          '75%': { transform: 'translateY(-30px) translateX(5px)' },
        },
        'pulse-expand': {
          '0%': { transform: 'scale(1)', opacity: '0.3' },
          '50%': { transform: 'scale(3)', opacity: '0.1' },
          '100%': { transform: 'scale(1)', opacity: '0.3' },
        },
      }
    },
  },
  plugins: [],
} 