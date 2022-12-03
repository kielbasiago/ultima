/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./pages/*.{ts,tsx}",
    "./styles/*.css",
  ],
  presets: [require('@ff6wc/ui/tailwind.config')],
  theme: {
    extend: {},
  },
  plugins: [],
};
