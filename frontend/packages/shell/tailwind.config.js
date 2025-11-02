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
        // Eckert Preisser Brand Colors
        'eckert-black': '#000000',
        'eckert-white': '#FFFFFF',

        // Official Apple Gradient Colors (from Apple Design Resources)
        'apple-pink': '#FF2D55',      // Apple Pink
        'apple-purple': '#AF52DE',    // Apple Purple
        'apple-blue': '#007AFF',      // Apple Blue
        'apple-orange': '#FF9500',    // Apple Orange
        'apple-yellow': '#FFCC00',    // Apple Yellow
        'apple-green': '#34C759',     // Apple Green
        'apple-red': '#FF3B30',       // Apple Red
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
        // Official Apple Gradients (from Apple Design Resources)

        // Primary: Pink → Purple → Blue (most common)
        'apple-gradient': 'linear-gradient(135deg, #FF2D55 0%, #AF52DE 50%, #007AFF 100%)',

        // Warm: Orange → Pink → Red
        'apple-gradient-warm': 'linear-gradient(135deg, #FF9500 0%, #FF2D55 50%, #FF3B30 100%)',

        // Cool: Green → Blue → Purple
        'apple-gradient-cool': 'linear-gradient(135deg, #34C759 0%, #007AFF 50%, #AF52DE 100%)',

        // Sunset: Yellow → Orange → Pink
        'apple-gradient-sunset': 'linear-gradient(135deg, #FFCC00 0%, #FF9500 50%, #FF2D55 100%)',

        // Purple Dream: Purple → Pink
        'apple-gradient-purple': 'linear-gradient(135deg, #AF52DE 0%, #FF2D55 100%)',

        // Ocean: Blue → Purple
        'apple-gradient-ocean': 'linear-gradient(135deg, #007AFF 0%, #AF52DE 100%)',

        // Subtle backgrounds
        'subtle-gradient': 'linear-gradient(to bottom right, rgba(255, 45, 85, 0.03), rgba(175, 82, 222, 0.03))',
        'subtle-gradient-warm': 'linear-gradient(to bottom right, rgba(255, 149, 0, 0.03), rgba(255, 45, 85, 0.03))',
      },
      boxShadow: {
        'apple-glow': '0 0 30px rgba(255, 45, 85, 0.4), 0 0 60px rgba(175, 82, 222, 0.3)',
        'apple-glow-lg': '0 0 40px rgba(255, 45, 85, 0.5), 0 0 80px rgba(175, 82, 222, 0.4)',
        'subtle': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'elevated': '0 8px 24px rgba(0, 0, 0, 0.12)',
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
        'scroll-ltr': 'scrollLTR 40s linear infinite',
        'scroll-rtl': 'scrollRTL 40s linear infinite',
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
          '0%': { boxShadow: '0 0 5px rgba(255, 45, 85, 0.5)' },
          '100%': { boxShadow: '0 0 25px rgba(255, 45, 85, 0.8), 0 0 50px rgba(175, 82, 222, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scrollLTR: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        scrollRTL: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}
