/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      colors: {
        ink: '#1e1a14',
        cream: '#faf6ee',
        parchment: '#f2ead8',
        moss: '#3a5c3a',
        moss2: '#5a8a4a',
        amber: '#c4762a',
        amber2: '#e8a84a',
      },
    },
  },
  plugins: [],
}