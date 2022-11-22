/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["dist/index.html", "src/**/*.{html,js}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      "white": "#FCFCFC",
      "dark": "#2E1C3C",
      "orange": "#FF9E6A",
      "pink": "#FF9090",
      "warning": "#E35E3F",
      "gray": "#EEEDEF",
      "green": "#50AA33",
      "gray": "#8492a6",
      "gray-light": "#d3dce6",
    },
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
      heading: ["Montserrat", "sans-serif"],
    },
    extend: {
      spacing: {},
      borderRadius: {},
    },
  },
  plugins: [],
};

