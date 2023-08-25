/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: ["./dist/*.{html,js}"],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      rose: colors.rose,
      green: colors.green,
    },
    extend: {
      colors: {
        'background':'hsl(180, 52%, 96%)',
        'filter-tablets':'hsl(180, 31%, 95%)',
        'cyan':{
          'desaturated-dark':'hsl(180, 29%, 50%)',
          'dark-grayish':'hsl(180, 8%, 52%)',
          'very-dark-grayish':'hsl(180, 14%, 20%)',
        }
      },
      fontSize:{
        base:'15px'
      },
    },
    fontFamily: {
      league: ['League Spartan', 'sans-serif'],
    },

  },
  plugins: [],
}