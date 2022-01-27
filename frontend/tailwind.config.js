module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F06C9B",
        secondary: "#B0228C",
        "medium-gray": "#000000A8", // input text color
        "light-gray": "#E6E6E6", // message text background
        orange: "#FFCD69", // game title text color
        green: "#00BA66", // matching answer text color
        purple: "#662E63", // game background color
      },
    },
    fontFamily: {
      monts: ["Montserrat", "sans-serif"],
    },
  },
  plugins: [],
};
