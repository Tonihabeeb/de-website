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
      }
    },
  },
  plugins: [],
} 