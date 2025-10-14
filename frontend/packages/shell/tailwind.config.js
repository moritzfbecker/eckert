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
        'apple-pink': '#ec4899',
        'apple-purple': '#a855f7',
        'apple-yellow': '#eab308',
      },
      backgroundImage: {
        'apple-gradient': 'linear-gradient(to right, #ec4899, #a855f7, #eab308)',
        'apple-gradient-hover': 'linear-gradient(to right, #db2777, #9333ea, #ca8a04)',
      },
      boxShadow: {
        'apple-glow': '0 0 25px rgba(236, 72, 153, 0.5)',
        'apple-glow-lg': '0 0 40px rgba(236, 72, 153, 0.6)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.6s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(236, 72, 153, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(236, 72, 153, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
