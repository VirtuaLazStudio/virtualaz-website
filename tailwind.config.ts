import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#08090a",
        foreground: "#f5f6f7",
        gold: {
          50: "#faf8f2",
          100: "#f3eedc",
          200: "#e6dab7",
          300: "#d5c18c",
          400: "#c1a462",
          500: "#af8945",
          600: "#997138",
          700: "#7f5a2f",
          800: "#684829",
          900: "#553b24",
          light: "#E6C9A8",
          DEFAULT: "#D4AF37",
          dark: "#AA820A",
        },
        luxury: {
          black: "#050506",
          dark: "#0F1012",
          card: "#17191C",
          gray: "#26292E",
          light: "#3E434A",
          text: "#A2A7B0",
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 8s ease-in-out infinite alternate",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 10px rgba(212, 175, 55, 0.1), 0 0 20px rgba(212, 175, 55, 0.05)" },
          "100%": { boxShadow: "0 0 25px rgba(212, 175, 55, 0.25), 0 0 45px rgba(212, 175, 55, 0.15)" },
        }
      }
    },
  },
  plugins: [],
};

export default config;
