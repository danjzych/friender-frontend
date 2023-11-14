/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{ts,tsx}",
    "./src/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins"],
      },
    },
  },
  daisyui: {
    themes: ["cupcake"],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
