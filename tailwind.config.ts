import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#17202A",
        paper: "#F7F3EA",
        mint: "#7AD7B7",
        coral: "#F47C64",
        plum: "#4D3F72",
        gold: "#F5C451"
      },
      boxShadow: {
        glow: "0 18px 60px rgba(23, 32, 42, 0.18)"
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out both",
        float: "float 7s ease-in-out infinite"
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
