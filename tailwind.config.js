/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dirt': '#8B7E74',
        'sage': '#C7BCA1',
        'tan': '#F1D3B3',
        'purp': '#65647C'
      }
    },
  },
  plugins: [],
}
