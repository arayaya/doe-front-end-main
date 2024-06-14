/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      white: "#ffffff",
      black: "#000000",
      main: "#791EC3",
      second: "#DD3737",
      third: "#C49F2D",
      btncancel: "#FF5046",
      lightgray: "#D9D9D9",
      darkgray: "#666666",
      middarkgray: "#555555",
      barbie: "#E24C86",
      second_barbie: "#EF5892",
      lightbarbie: "#FCEDF3",
    },
    extend: {
      width: {
        a4: "8.27in",
      },
      height: {
        a4: "10.20in",
      },
      fontFamily: {
        font_Bd: ["LINE Seed Sans Bd"],
        font_Rg: ["LINE Seed Sans Rg"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
