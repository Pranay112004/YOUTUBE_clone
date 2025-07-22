/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 0.3s ease-out",
        slideIn: "slideIn 0.2s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      colors: {
        youtube: {
          red: "#FF0000",
          gray: "#F1F1F1",
          dark: "#0F0F0F",
          chip: "#E5E5E5",
          chipHover: "#D3D3D3",
        },
      },
      screens: {
        "3xl": "1920px",
      },
    },
  },
  plugins: [],
};
