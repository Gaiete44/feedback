// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        terracotta: {
          50: '#fdf2f1',
          100: '#fbdad8',
          200: '#f7b5b1',
          300: '#f28f89',
          400: '#ee6a62',
          500: '#ea453b',
          600: '#d93022',
          700: '#b5251b',
          800: '#911e16',
          900: '#6e1711',
        },
        jade: {
          50: '#f2f9f6',
          100: '#dff0e9',
          200: '#bfe0d3',
          300: '#9ecfbd',
          400: '#7ebfa7',
          500: '#5eaf91',
          600: '#429777',
          700: '#357a60',
          800: '#2a614c',
          900: '#204939',
        },
        marigold: {
          50: '#fff9eb',
          100: '#ffefc6',
          200: '#ffdf88',
          300: '#ffcf4a',
          400: '#ffbf0c',
          500: '#f7ad00',
          600: '#cc8a00',
          700: '#a16600',
          800: '#835200',
          900: '#6b4200',
        },
        warmWhite: '#fdfbf7',
      },
      fontFamily: {
        joti: ['Joti One', 'cursive'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};