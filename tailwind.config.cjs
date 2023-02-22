/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "white": "#fff",
      "gray": "#c0c0c0",
      "gray.50": "#525252",
      "gray.100": "#ddd",
      "red.50": "#ff0000",
    },
    extend: {},
  },
  plugins: [],
}