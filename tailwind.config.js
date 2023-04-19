/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'buttonColor': '#1A3835',
        'hoverColor': '#1a3835',
        'textColor': '#1A3835',
        'rempassColor': '#292929',
        'bggradient': '#8A98C8;',
        'bggradient2': '#B9E3CF',
      }, 
    
    },
  },
  plugins: [],
};
