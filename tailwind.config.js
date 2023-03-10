/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './pages-fallback/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#014D40',
          800: '#0C6B58',
          700: '#147D64',
          600: '#199473',
          500: '#27AB83',
          400: '#3EBD93',
          300: '#65D6AD',
          200: '#8EEDC7',
          100: '#C6F7E2',
          50: '#EFFCF6',
        },
        secondary: {
          900: '#102A43',
          800: '#243B53',
          700: '#334E68',
          600: '#486581',
          500: '#627D98',
          400: '#829AB1',
          300: '#9FB3C8',
          200: '#BCCCDC',
          100: '#D9E2EC',
          50: '#F0F4F8',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            'h1, h2, h3, h4, h5, h6': {
              color: theme('colors.primary.800'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
