/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        "sm": "512px",
        "m": '768px',
        "l": '1024px',
        "xl": "1366px",
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
        mono: "'Roboto Mono', monospace",
        roboto: "'Roboto', sans-serif",
        cinzel: "'Cinzel', sans-serif",
      },
      boxShadow: {
        'input-focus': '0 0 0 2px #55cbff',
        'switch-focus': '0 0 0 4px #55cbff',
        'range-focus': '0 0 0 4px #55cbff',
        'rainbow': ' 5px 5px 15px 5px #FF8080, -9px 5px 15px 5px #FFE488, -7px -5px 15px 5px #8CFF85, 12px -5px 15px 5px #80C7FF, 12px 10px 15px 7px #E488FF, -10px 10px 15px 7px #FF616B, -10px -7px 27px 1px #8E5CFF, 5px 5px 15px 5px rgba(0,0,0,0) '
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
