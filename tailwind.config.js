/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00B98E',
          50: '#E6F8F4',
          100: '#CCF1E9',
          200: '#99E3D3',
          300: '#66D5BD',
          400: '#33C7A7',
          500: '#00B98E',
          600: '#009472',
          700: '#006F55',
          800: '#004A39',
          900: '#00251C',
        },
      },
      fontFamily: {
        heebo: ['Heebo', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}