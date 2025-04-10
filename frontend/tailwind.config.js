const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  plugins: [require("@tailwindcss/typography")],
  colors: {
    ...colors,
  },
  theme: {
    extend: {
      screens: {
        xs: '36em',
        sm: '48em',
        md: '62em',
        lg: '75em',
        xl: '88em',
      },
    },
  },
}