/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{ts,tsx}",
    "./design-components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./pages/*.{ts,tsx}",
    "./styles/*.css",
  ],
  theme: {
    extend: {
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
          background: "#F3F3F3",
          border: "#D2CFC9",
          "header-background": "#E5E5E5",
        },
        inputs: {
          background: "#FFFFFF",
          border: "#D2CFC9",
        },
      },
      fontFamily: {
        sans: "'Montserrat', sans-serif",
        montserrat: "'Montserrat', sans-serif",
        cinzel: "'Cinzel', sans-serif",
      },
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
