/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        buttonColor: "#1A3835",
        hoverColor: "#1a3835",
        textColor: "#1A3835",
        rempassColor: "#292929",
        bggradient: "#8A98C8;",
        bggradient2: "#B9E3CF",
        sidebarColor1: "#E6F2ED",
        sidebarColor1: "#E6F2ED",
        sidebarColor2: "#FCFDFC",
        borderColor: "#DFE3E1",
        selectedColor: "#E9F3F2",
      },
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
        Gilroy: ["Gilroy", "sans-serif"],
        GilroyBold: ["Gilroy-Bold", "sans-serif"],
        GilroySemiBold: ["Gilroy-semibold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
