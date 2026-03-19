/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx,css}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#1A1814',
        surface: '#252219',
        brand: '#3B4A8C',
        accent: '#C9943A',
        cream: '#F0EAD6',
        muted: '#9A9485',
        rim: '#302C24',
      },
    },
  },
  plugins: [],
};

export default config;
