/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      rotate: {
        360: "360deg",
      },
      screens: {
        xs: "200px",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
