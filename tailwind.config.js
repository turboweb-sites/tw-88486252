/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#D4AF37',
          600: '#B8960C',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        dark: {
          50: '#2a2a2a',
          100: '#1f1f1f',
          200: '#1a1a1a',
          300: '#151515',
          400: '#111111',
          500: '#0d0d0d',
          600: '#0a0a0a',
          700: '#070707',
          800: '#050505',
          900: '#000000',
        },
        metallic: {
          silver: '#C0C0C0',
          chrome: '#DBE2E9',
          gunmetal: '#2C3539',
          platinum: '#E5E4E2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Oswald', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(212, 175, 55, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.8)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-gradient': 'linear-gradient(135deg, #D4AF37, #F5E6A3, #D4AF37)',
        'dark-gradient': 'linear-gradient(180deg, #0a0a0a, #1a1a1a)',
      },
    },
  },
  plugins: [],
};