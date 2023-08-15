/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.jsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'Ambit', 'sans-serif'],
      },
      colors: {
        logo: '#0044ff',
      },
    },
  },
  plugins: [],
};
