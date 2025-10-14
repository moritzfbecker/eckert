/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../shared/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Eckert Preisser Brand Colors (Porsche-inspired)
        'eckert-black': '#010205',
        'eckert-white': '#FFFFFF',

        // Apple Gradient Colors (nur für Akzente!)
        'apple-pink': '#ec4899',
        'apple-purple': '#a855f7',
        'apple-yellow': '#eab308',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'display-sm': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.02em' }],  // 36px
        'display-md': ['3rem', { lineHeight: '3.5rem', letterSpacing: '-0.02em' }],     // 48px
        'display-lg': ['3.75rem', { lineHeight: '4rem', letterSpacing: '-0.02em' }],    // 60px
        'display-xl': ['4.5rem', { lineHeight: '5rem', letterSpacing: '-0.02em' }],     // 72px
      },
      backgroundImage: {
        'apple-gradient': 'linear-gradient(to right, #ec4899, #a855f7, #eab308)',
        'apple-gradient-hover': 'linear-gradient(to right, #db2777, #9333ea, #ca8a04)',
        'subtle-gradient': 'linear-gradient(to bottom right, rgba(236, 72, 153, 0.05), rgba(234, 179, 8, 0.05))',
      },
      boxShadow: {
        'apple-glow': '0 0 25px rgba(236, 72, 153, 0.5)',
        'apple-glow-lg': '0 0 40px rgba(236, 72, 153, 0.6)',
        'subtle': '0 2px 8px rgba(0, 0, 0, 0.2)',
        'elevated': '0 8px 24px rgba(0, 0, 0, 0.3)',
      },
      backdropBlur: {
        'porsche': '32px',
      },
      borderRadius: {
        'sm': '4px',
        'DEFAULT': '8px',   // Porsche default!
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        'full': '9999px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'slide-left': 'slideLeft 0.6s ease-out',
        'slide-right': 'slideRight 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(236, 72, 153, 0.5)' },
          '100%': { boxShadow: '0 0 25px rgba(236, 72, 153, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}
