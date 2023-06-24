/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    colors: {
      black: "#252525",
      white: "#fff",
      red: "#ED4B72",
      green: "#04D4A4",
      primary: "#0852CC",
      blue: "#008bd9",
      "gray-600": "#494949",
      "gray-500": "#5a5a5a",
      "gray-400": "#b1b1b1",
      "gray-300": " #e0e0e0",
      "gray-200": "#f1f1f1",
      "gray-100": "#FBFBFB",
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
};
