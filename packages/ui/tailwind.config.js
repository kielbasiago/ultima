/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./stories/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        background: "#F3F3F3", // PLATINUM
        "panel-background": "#E5E5E5", //CULTURED
        "big-text": "#634064", // ENGLISH VIOLET
        headings: "#1D3461", // SPACE CADET
        link: "#2E86AB", // BLUE NCS

        button: {
          bg: "#F5F5F5",
          border: "#D2CFC9",
        },
        input: {
          bg: "#FFFFFF",
          border: "#D2CFC9",
        },
      },
      fontFamily: {
        /*
        font-family: 'Cinzel', serif;
        font-family: 'Montserrat', sans-serif;
        font-family: 'Roboto', sans-serif;

        */
        sans: "'Montserrat', sans-serif",
      },
    },
    borderWidth: {
      1: "1px",
    },
    fontFamily: {
      "big-text": "'Cinzel', serif;",
    },
  },
  plugins: [],
};
