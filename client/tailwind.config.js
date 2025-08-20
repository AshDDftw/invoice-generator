/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#CCF575',
        dark: '#141414',
        'dark-secondary': '#1F1F1F',
        'dark-tertiary': '#202020',
        'border-dark': '#424647',
        'text-gray': '#707070',
        'text-light-gray': '#B8B8B8'
      },
      fontFamily: {
        'pretendard': ['Pretendard', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}