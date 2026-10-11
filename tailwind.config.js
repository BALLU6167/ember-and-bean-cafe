/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        origin: {
          bg: '#050505',
          surface: '#0A0A0C',
          card: '#0E0E12',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-light': 'rgba(255, 255, 255, 0.14)',
          indigo: '#0050FF',
          'indigo-glow': 'rgba(0, 80, 255, 0.2)',
          cyan: '#00D6FF',
          'cyan-glow': 'rgba(0, 214, 255, 0.2)',
          muted: 'rgba(255, 255, 255, 0.6)',
          faint: 'rgba(255, 255, 255, 0.35)',
        },
        ember: {
          bg: '#120D0A',
          surface: '#1A130E',
          card: '#221913',
          border: 'rgba(217, 160, 102, 0.18)',
          'border-hover': 'rgba(217, 160, 102, 0.45)',
          amber: '#D49B6A',
          terracotta: '#B86F43',
          cream: '#FAF6F0',
          parchment: '#DDD3C4',
          muted: 'rgba(221, 211, 196, 0.65)',
        },
      },
      fontFamily: {
        serif: ['"Fraunces"', '"Newsreader"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['"Fraunces"', '"Newsreader"', 'Georgia', 'serif'],
        mono: ['"SF Mono"', '"Roboto Mono"', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.025em',
        widest: '0.2em',
      },
      boxShadow: {
        'glow-cyan': '0 0 35px -5px rgba(0, 214, 255, 0.3)',
        'glow-indigo': '0 0 35px -5px rgba(0, 80, 255, 0.35)',
        'glow-pill': '0 0 20px -2px rgba(0, 214, 255, 0.25)',
        'inner-void': 'inset 0 0 80px rgba(0, 0, 0, 0.95)',
      },
      backgroundImage: {
        'radial-void': 'radial-gradient(circle at 50% 50%, #050815 0%, #050505 75%)',
        'gradient-cyan-indigo': 'linear-gradient(135deg, #00D6FF 0%, #0050FF 100%)',
      },
      keyframes: {
        pulseSlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.85' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'pulse-slow': 'pulseSlow 4s ease-in-out infinite',
        'float': 'float 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
