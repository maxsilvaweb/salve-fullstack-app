/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{css,xml,html,vue,svelte,ts,tsx}'
  ],
  darkMode: ['class', '.ns-dark'],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
      keyframes: {
        'slide-in-top': {
          '0%': { transform: 'translateY(-100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      animation: {
        'slide-in-top': 'slide-in-top 0.3s ease-out',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}