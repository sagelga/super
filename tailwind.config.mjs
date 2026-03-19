/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx,css}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors (Primary)
        brand: {
          DEFAULT: '#3B4A8C',
          50: '#E8ECF5',
          100: '#C5CDE3',
          200: '#9FAFD1',
          300: '#7991BF',
          400: '#5373AD',
          500: '#3B4A8C',
          600: '#2F3C70',
          700: '#232E54',
          800: '#172038',
          900: '#0B121C',
        },
        // Accent Colors
        accent: {
          DEFAULT: '#C9943A',
          50: '#FDF6EC',
          100: '#FAE8CF',
          200: '#F5D7A1',
          300: '#F0C673',
          400: '#D4A84A',
          500: '#C9943A',
          600: '#A87730',
          700: '#7D5924',
          800: '#523B18',
          900: '#271D0C',
        },
        // Canvas (Dark Background)
        canvas: '#1A1814',
        // Surface (Card Background)
        surface: '#252219',
        // Cream (Light Text/Background)
        cream: '#F0EAD6',
        // Muted (Secondary Text)
        muted: '#9A9485',
        // Rim (Border)
        rim: '#302C24',
        // Semantic Colors
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
        // Map standard colors to custom palette for consistency
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
      },
    },
  },
  plugins: [],
};

export default config;
