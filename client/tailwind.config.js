/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        signature: ["Montserrat Subrayada"],
      },
      colors: {
        "light-gray": "#1f1f1f",
        "light-dark": "#151415",
        "medium-dark": "#0E0E0E",
        "dark-purple": "#1b0b10",
        "light-cream": "#b28a73",
        "light-purple": "rgba(8, 26, 81, 0.17)",
        "light-white": "rgba(255,255,255,0.17)",
        "light-red": "rgba(255, 102, 102, 0.17)",
        "dark-white": "rgba(192, 192, 192, 0.1)",
        "medium-white": "rgba(192, 192, 192, 0.1)",
        "light-green": "rgba(102 , 255, 102, 0.17)",
      },
    },
  },
  plugins: [],
};
