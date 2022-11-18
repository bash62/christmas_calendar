/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/views/**/*.ejs',
    './src/public/**/*.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'fade-in': 'fade-in 0.2s ease-in-out',
        'fade-out': 'fade-out 0.2s ease-in-out',
        'fade-in-loader': 'fade-in-loader 0.5s ease-in',
        'fade-out-loader': 'fade-out-loader 0.5s ease-out',
        'fade-in-blur': 'fade-in-blur 0.5s ease-in',
      },
      keyframes: {
        'fade-in-blur': {
          '0%': {
            blur: {
              sm: '0px',
            }
          },
          '100%': {
            blur: {
              sm: '10px',
            }
          }
        },
        'fade-in-loader' : {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
        'fade-out-loader' : {
          '0%': {
            opacity: 1,
          },
          '100%': {
            opacity: 0,
          },
        },
        'fade-in': {
          '0%': {
            opacity: '1',
            TransformStream: 'translateZ(-100px)',
          },
          '100%': {
            opacity: '1',
            TransformStream: 'translateZ(0px)',
          },
        },
        'fade-out': {
          '0%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},
    },
  ],
}