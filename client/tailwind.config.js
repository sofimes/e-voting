/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: { max: "605px" }, // applies styles for screens 650px and smaller
      },
      colors: {
        navcolor: " rgba(255, 255, 255, 0.905)",
        contrastcolor: "#312f2f",
        accentcolor: "rgb(6, 182, 212)",
        headbg: "rgba(55, 65, 81, 0.9)",
        backgroundcolor: "#060606",
        defaultcolor: "#ffffff",
        headingcolor: "#ffffff",
        surfacecolor: "#252525",
        concolor: "#2a2727",
        pcolor: "#C4C4C5",
      },
      fontFamily: {
        navfont: ['"Roboto"', "sans-serif"],
      },
      boxShadow: {
        "text-shadow-md": "2px 2px 5px rgba(0, 0, 0, 0.6)",
        "text-shadow-lg": "3px 3px 8px rgba(0, 0, 0, 0.8)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".hero:before": {
          content: '""',
          background: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4))",
          position: "absolute",
          inset: "0",
          zIndex: "2",
        },
        ".border-color-mix": {
          border: "1px solid color-mix(in srgb, #ffffff, transparent 70%)",
        },
        ".text-color-mix": {
          color: "color-mix(in srgb, var(--default-color), transparent 20%)",
        },
        ".calltoaction:before": {
          content: "",

          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9))",
          position: "absolute",
          inset: "0",
          zIndex: "2",
        },
        ".clip-inset-0": {
          clipPath: "inset(0)",
        },
      });
    },
  ],
};
