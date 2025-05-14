/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
      },
      colors: {
        background: '#1A1A1A',
        'section-dark': '#2B2B2B',
        accent: '#A8E10C',
        'accent-hover': '#6AFF00',
        'owl-eye-gold': '#FFD700',
        'owl-eye-red': '#FF0000',
        'text-primary': '#FFFFFF',
        'text-secondary': '#CCCCCC',
      },
      boxShadow: {
        neon: '0 0 5px #6AFF00, 0 0 10px #6AFF00',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
        glowBorder: {
          '0%, 100%': { boxShadow: '0 0 5px #A8E10C, 0 0 10px #A8E10C' },
          '50%': { boxShadow: '0 0 15px #6AFF00, 0 0 20px #6AFF00' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out',
        'pulse-slow': 'pulseSlow 3s infinite',
        'glow-border': 'glowBorder 2s infinite',
      },
    },
  },
  plugins: [],
};