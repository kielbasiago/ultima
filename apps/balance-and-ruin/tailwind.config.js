/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./card-components/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./design-components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./pages/*.{ts,tsx}",
    "./page-components/*.{ts,tsx}",
    "./styles/*.css",
  ],
  theme: {
    extend: {
      screens: {
        "m": '720px',
        "l": '1024px',
      },
      transitionDuration: {
        40: "40ms",
      },
      colors: {
        transparent: "transparent",
        background: "#F3F3F3", // PLATINUM
        "big-text": "#634064", // ENGLISH VIOLET
        headings: "#1D3461", // SPACE CADET
        link: "#2E86AB", // BLUE NCS
        panel: {
          background: "#FFFFFF",
          border: "#D2CFC9",
          "header-background": "#f3f3f3",
        },
        inputs: {
          background: "#FFFFFF",
          border: "#D2CFC9",
          focus: '#33abff99',
        },
      },
      fontFamily: {
        sans: "'Montserrat', sans-serif",
        montserrat: "'Montserrat', sans-serif",
        cinzel: "'Cinzel', sans-serif",
      },
      boxShadow: {
        'input-focus': '0 0 0 2px #55cbff',
        'switch-focus': '0 0 0 4px #55cbff',
        'range-focus': '0 0 0 4px #55cbff'
      }
    },
    borderWidth: {
      0: "0",
      1: "1px",
      2: "2px",
      3: "3px",
      4: "4px",
    },
  },
  plugins: [],
};
