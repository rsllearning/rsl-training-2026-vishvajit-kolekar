/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3973a8',
        'primary-hover': '#2d5e8a',
        ink: '#222222',
        muted: '#666666',
        canvas: '#f3f3f3',
      },
      spacing: {
        card: '1rem',
      },
      borderRadius: {
        card: '0.25rem',
      },
    },
  },
  plugins: [],
}
