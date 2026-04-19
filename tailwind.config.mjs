/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx,css}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand indigo — from Super Design System handoff bundle
        brand: {
          DEFAULT: '#3B4A8C',
          50:  '#F0F2F8',
          100: '#DDE1F0',
          200: '#B8C0DC',
          300: '#8E9BC4',
          400: '#5E6DAA',
          500: '#3B4A8C',
          600: '#2E3A70',
          700: '#262F5A',
          800: '#1E2548',
          900: '#151A33',
        },
        // Accent amber — from Super Design System handoff bundle
        accent: {
          DEFAULT: '#C9943A',
          50:  '#FBF6EC',
          100: '#F5E8CB',
          200: '#ECD395',
          300: '#E0BB63',
          400: '#D3A44A',
          500: '#C9943A',
          600: '#A77A2F',
          700: '#7D5B22',
          800: '#5A4218',
          900: '#3B2B10',
        },
        // Canvas (warm near-black body background)
        canvas: '#1A1814',
        // Surface (raised cards and sections)
        surface: '#252219',
        // Cream (primary text — softer than white)
        cream: '#F0EAD6',
        // Muted (captions, dates, secondary info)
        muted: '#9A9485',
        // Muted-readable (muted text on canvas at AA contrast)
        'muted-readable': '#BDB5A6',
        // Rim (default 1px border)
        rim: '#302C24',
        // Semantic role aliases
        background: {
          dark: '#1A1814',
          light: '#F0EAD6',
        },
        foreground: {
          dark: '#F0EAD6',
          light: '#1A1814',
        },
        card: {
          dark: '#252219',
          light: '#FFFFFF',
        },
        // Grayscale mapped into the warm palette for consistency
        gray: {
          50: '#F0EAD6',
          100: '#E8E0CC',
          200: '#D4C9B0',
          300: '#B5A88F',
          400: '#9A9485',
          500: '#7D7468',
          600: '#60594E',
          700: '#302C24',
          800: '#252219',
          900: '#1A1814',
        },
      },
      fontFamily: {
        sans: ['IBM Plex Sans Thai', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
        serif: ['IBM Plex Serif', 'serif'],
        display: ['IBM Plex Serif', 'Georgia', 'serif'],
      },
      boxShadow: {
        // Signature lamplight hover — used on cards and CTAs
        hover: '0 4px 32px -8px rgba(201, 148, 58, 0.12)',
        'card-hover': '0 4px 24px -6px rgba(201, 148, 58, 0.10)',
      },
      transitionTimingFunction: {
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'out-expo':  'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
