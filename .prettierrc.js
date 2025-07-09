/** @type {import('prettier').Config} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./src/app/globals.css",
  tabWidth: 4,
};

export default config;
