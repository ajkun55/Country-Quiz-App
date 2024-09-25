/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "light-gray": "#E2E4F3",
      gray: "#8B8EAB",
      dark: "#343964",
      darker: "#393F6E",
    },
    extend: {
      backgroundImage: { lg: "linear-gradient(90deg,#E65895, #BC6BE8)" },
    },
  },
  plugins: [],
};
