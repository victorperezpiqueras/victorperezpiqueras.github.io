/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        xs: "100%",
      },
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
  safelist: [
    {
      pattern: /translate-(x|y)-.+/,
    },
  ],
  plugins: [require("flowbite/plugin")],
};
