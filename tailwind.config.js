/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Lato"', 'sans-serif'],
        accent: ['"Cinzel"', 'serif'],
      },
      colors: {
        navy: {
          50:  '#e8edf5',
          100: '#c5d0e6',
          200: '#9fb0d4',
          300: '#7890c2',
          400: '#5171ae',
          500: '#2e5299',
          600: '#1B365D',
          700: '#152b4a',
          800: '#0f1f37',
          900: '#091424',
        },
        sand: {
          50:  '#fdf9f5',
          100: '#f8f0e6',
          200: '#DCCBB5',
          300: '#c9aa8e',
          400: '#b58d6a',
          500: '#9e7149',
          600: '#7d5735',
          700: '#5c3f25',
          800: '#3a2717',
          900: '#1e130b',
        },
        charcoal: '#333333',
        offwhite: '#F5F0E8',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'slide-left': 'slideLeft 0.7s ease forwards',
        'slide-right': 'slideRight 0.7s ease forwards',
        'shimmer': 'shimmer 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'loader-bar': 'loaderBar 2.5s ease forwards',
        'loader-fade': 'loaderFade 0.6s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        loaderBar: {
          '0%': { width: '0%' },
          '60%': { width: '75%' },
          '100%': { width: '100%' },
        },
        loaderFade: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0', pointerEvents: 'none' },
        },
      },
    },
  },
  plugins: [],
}
