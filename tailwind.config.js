/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
       colors: {
        primary: '#EBC351',
        secondary: '#FFE74D',
        darkRed: '#FF2400',
        green: '#008000',
        black: '#000',
        skyBlue: '#33B9EF',
        orange: '#FCBC05',
        lightGray: '#E5D0A5',
        lightGray2: '#B29367'
      },
    },
  },
  plugins: [],
}

