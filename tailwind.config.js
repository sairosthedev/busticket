/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['SpaceX', 'sans-serif'],
        'spacex': ['SpaceX', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: "class",
}