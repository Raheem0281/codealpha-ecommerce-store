/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // matches Abdul's preferred UI palette
        base: "#0E0E0E",
        accent: "#FF6B00",
        warmgray: "#EAEAEA",
        smoky: "#565656",
      },
    },
  },
  plugins: [],
};
