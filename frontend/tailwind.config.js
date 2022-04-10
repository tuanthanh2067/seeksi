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
        purple: "#662E63", // game background color
      },
      boxShadow: {
        inner: "inset 0 4px 4px 0 rgba(0, 0, 0, 0.25)",
        card: "4px 4px 25px 0 rgba(0, 0, 0, 0.2)",
      },
    },
    fontFamily: {
      monts: ["Montserrat", "sans-serif"],
    },
    plugins: [],
  },
};
