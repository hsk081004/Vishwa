/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vishwa: {
          white: '#FFFFFF',
          cream: '#FFF8FA',
          blush: '#FFE4EC',
          babypink: '#FFC2D6',
          rose: '#FF8FB1',
          hotpink: '#FF4D8D',
          deeprose: '#C2185B',
          glow: 'rgba(255, 77, 141, 0.35)',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        fraunces: ['"Fraunces"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Nunito', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.06)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      boxShadow: {
        'pink-glow': '0 0 35px -5px rgba(255, 77, 141, 0.35)',
        'pink-soft': '0 10px 30px -10px rgba(255, 143, 177, 0.3)',
        'glass': '0 8px 32px 0 rgba(255, 143, 177, 0.15)',
        'wax-seal': '0 4px 15px rgba(194, 24, 91, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.4)',
      }
    },
  },
  plugins: [],
}

