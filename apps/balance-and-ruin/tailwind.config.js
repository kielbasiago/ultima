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
    "../../packages/ui/**/*.{ts,tsx}",
    "../../packages/utils/**/*.{ts,tsx}",
  ],
  presets: [
    require('@ff6wc/tailwind-config')
  ]
};
