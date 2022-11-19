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
        'fade-in-long': 'fade-in 0.5s ease-in-out',
        'fade-out': 'fade-out 0.2s ease-in-out',
        'fade-in-loader': 'fade-in-loader 0.2s ease-in',
        'fade-out-loader': 'fade-out-loader 0.2s ease-out',
        'fade-in-blur': 'fade-in-blur 0.2s ease-in',
        'floating': 'floating 2s ease-in-out infinite',
        'floating-shadow': 'floating-shadow 1s ease-in-out infinite',
        'scale-in': 'scale-in 0.2s ease-in',
        'scale-out': 'scale-out 0.2s ease-out',
      },
      keyframes: {
        'scale-in': {
          '0%': { transform: 'scale(0.5)' },
          '100%': { transform: 'scale(1)' },
        },
        'scale-out': {
          '0%': { transform: 'scale(2)' },
          '100%': { transform: 'scale(1)' },
        },
        'floating-shadow': {
          '0%, 10%': {
            backgroundColor: 'radial-gradient(ellipse at center, #00000073 0%, #53535307 50%, #ffffff00 100%)',
          },
          '20%, 30%': {
            backgroundColor: 'radial-gradient(ellipse at center, #00000065 0%, #53535302 50%, #ffffff00 100%)',
          },
          '40%, 50%': {
            backgroundColor: 'radial-gradient(ellipse at center, #00000053 0%, #53535300 50%, #ffffff00 100%)',
          },
          '60%, 70%': {
            backgroundColor: 'radial-gradient(ellipse at center, #00000068 0%, #53535307 50%, #ffffff00 100%)',
          },
          '80%, 90%': {
            backgroundColor: 'radial-gradient(ellipse at center, #00000073 0%, #53535302 50%, #ffffff00 100%)',
          },
          '100%': {
            backgroundColor: 'radial-gradient(ellipse at center, #00000054 0%, #53535308 50%, #ffffff00 100%)',
          },
        },
        'floating': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-15px)',
          },
        },
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
            opacity: '0',
          },
          '100%': {
            opacity: '1',
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