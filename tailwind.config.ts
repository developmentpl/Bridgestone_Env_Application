import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  // Card-frame colours are built from strings, so force-generate them all.
  safelist: [
    { pattern: /(from|to|bg|text|border)-(indigo|orange|teal|rose|violet|amber|sky|lime)-(50|500|600|700|800)/ },
  ],
  theme: {
    extend: {
      colors: {
        // Sustainability / circular-economy palette
        leaf: {
          50: "#f3faf3",
          100: "#e3f5e3",
          200: "#c8eac9",
          300: "#9dd8a0",
          400: "#6abd6f",
          500: "#45a14c",
          600: "#34843b",
          700: "#2c6931",
          800: "#27542b",
          900: "#214525",
          950: "#0e2511",
        },
        earth: {
          50: "#faf7f2",
          100: "#f3ece0",
          200: "#e6d7bf",
          300: "#d5bc96",
          400: "#c29d6c",
          500: "#b48852",
          600: "#a67546",
          700: "#8a5d3c",
          800: "#704c36",
          900: "#5b3f2e",
        },
        moss: "#4d7c0f",
        sky2: "#0e7490",
      },
      boxShadow: {
        card: "0 1px 3px rgba(20, 45, 25, 0.12), 0 4px 14px rgba(20, 45, 25, 0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
