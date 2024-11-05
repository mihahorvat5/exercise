/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customOrange: '#DC5A27',
        customBlue: 'rgb(9, 15, 45)',
        customWhite: '#FFFFFF',
        'mid-neutral-100': 'rgb(168 174 202 / <alpha-value>)',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
