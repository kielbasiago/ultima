/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./styles/*.css",
    "../../packages/ui/**/*.{ts,tsx}",
    "../../packages/ui/*.{ts,tsx}"
  ],
  presets: [
    require('@ff6wc/tailwind-config')
  ]
};
