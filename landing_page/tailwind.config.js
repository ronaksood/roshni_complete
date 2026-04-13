/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        burgundy: {
          950: "#12070a",
          900: "#1a0a0f",
          800: "#2a1118",
          700: "#4f1f2d",
          500: "#7d3148",
        },
        cream: {
          50: "#fffaf2",
          100: "#f5ead8",
          200: "#e8d7c1",
        },
        gold: {
          300: "#ddc090",
          400: "#c8a76f",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        body: ['"Manrope"', "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 35px rgba(221, 192, 144, 0.35)",
      },
      backgroundImage: {
        "mist-core":
          "radial-gradient(circle at center, rgba(255,248,237,0.7) 0%, rgba(248,232,212,0.45) 30%, rgba(143,107,91,0.15) 60%, transparent 78%)",
      },
      animation: {
        drift: "drift 16s ease-in-out infinite",
        float: "float 12s ease-in-out infinite",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(2%, -2%, 0) scale(1.08)" },
        },
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -14px, 0)" },
        },
      },
    },
  },
  plugins: [],
};
