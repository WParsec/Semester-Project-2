/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./dist/*.html", "./dist/**/*.html"],
  theme: {
    colors: {
      "white": "#FCFCFC",
      "dark": "#2E1C3C",
      "orange": "#FF9E6A",
      "pink": "#FF9090",
      "warning": "#E35E3F",
      "gray": "#EEEDEF",
      "green": "#A1E08E",
      "dark-green": "#50AA33",
      "soft": "#C8B8D5",
      "dark-opacity": "rgba(0, 0, 0, 0.6)",
    },
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
      heading: ["Montserrat", "sans-serif"],
    },
    extend: {
      spacing: {},
      borderRadius: {},
      backgroundImage: {
        'hero-pattern': "url('/dist/assets/bg.jpg')",
        'header-image': "url('/dist/assets/header.jpg')",
      },
      gridTemplateColumns: {
        "profile": "0.5fr, 1fr",
      }
    },
  },
  plugins: [],
};