/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Midnight Library Palette
        midnight: {
          50: '#E8EAF0',
          100: '#C5CAD9',
          200: '#9FA7C0',
          300: '#7984A7',
          400: '#5C6994',
          500: '#3F4F81',
          600: '#374579',
          700: '#2D3A6E',
          800: '#242F64',
          900: '#151D51',
          950: '#0A0E1A', // Deepest background
        },
        cosmic: {
          50: '#F3E8F8',
          100: '#E1C5EE',
          200: '#CD9FE3',
          300: '#B978D8',
          400: '#A95ACF',
          500: '#9A3CC7', // Primary purple
          600: '#8C35B8',
          700: '#7A2CA5',
          800: '#692493',
          900: '#4A1572',
        },
        aurora: {
          50: '#E6F7F9',
          100: '#C0EBF0',
          200: '#96DEE6',
          300: '#6BD0DC',
          400: '#4BC5D4',
          500: '#2BBBCD', // Accent teal
          600: '#26AAB8',
          700: '#1F959F',
          800: '#198087',
          900: '#0F5C5F',
        },
        gold: {
          50: '#FFF8E6',
          100: '#FFEDC0',
          200: '#FFE196',
          300: '#FFD46B',
          400: '#FFCA4B',
          500: '#FFC02B', // Warm gold accent
          600: '#FFB126',
          700: '#FF9D1F',
          800: '#FF8A19',
          900: '#FF680F',
        },
        // Semantic colors
        surface: {
          primary: '#0A0E1A',
          secondary: '#151D51',
          tertiary: '#242F64',
          elevated: 'rgba(255, 255, 255, 0.05)',
          glass: 'rgba(255, 255, 255, 0.08)',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#C5CAD9',
          tertiary: '#7984A7',
          inverse: '#0A0E1A',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.08)',
          default: 'rgba(255, 255, 255, 0.12)',
          strong: 'rgba(255, 255, 255, 0.24)',
        },
      },
      fontFamily: {
        sans: ['System', 'sans-serif'],
        display: ['System', 'sans-serif'], // Replace with custom font later
        mono: ['Menlo', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '4.5': '1.125rem',
        '13': '3.25rem',
        '15': '3.75rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        glow: '0 0 20px rgba(154, 60, 199, 0.3)',
        'glow-gold': '0 0 20px rgba(255, 192, 43, 0.3)',
        'glow-aurora': '0 0 20px rgba(43, 187, 205, 0.3)',
        glass: '0 8px 32px rgba(0, 0, 0, 0.4)',
        elevated: '0 4px 24px rgba(0, 0, 0, 0.5)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(154, 60, 199, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(154, 60, 199, 0.5)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};

