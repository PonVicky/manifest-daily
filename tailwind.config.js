/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
      },
      colors: {
        'bg-base': '#FBF3E7',
        'bg-mid': '#F4EADB',
        'bg-glow': '#EAD3B4',
        fill: '#FFFDF9',
        gold: '#D6A87A',
        text: '#3A3028',
        'text-2': '#7A6B5D',
        hairline: '#ECDFCE',
      },
    },
  },
  plugins: [],
}
