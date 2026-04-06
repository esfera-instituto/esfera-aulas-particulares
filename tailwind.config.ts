import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        tinta: "#1f2937",
        marinho: "#0f172a",
        creme: "#f8fafc",
        azul: "#1d4ed8"
      }
    }
  },
  plugins: []
};

export default config;
