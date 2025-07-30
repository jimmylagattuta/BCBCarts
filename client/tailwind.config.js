/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // ensure all React components are scanned
  ],
  theme: {
    extend: {
      colors: {
        brandOrange: '#f35c02',
      },
      fontFamily: {
        fancy: ['"Playfair Display"', 'serif'],
      },
      animation: {
        growFont: 'growFont 0.5s ease-in-out forwards',
      },
      keyframes: {
        growFont: {
          '0%': { fontSize: '0rem' },
          '95%': { fontSize: '10rem' },
          '100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
