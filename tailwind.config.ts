import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          base: '#17012C',
          gradient: '#2A235A',
        },
      },
      fontFamily: {
        lacquer: ["var(--font-lacquer)"],
        montserrat: ["var(--font-montserrat)"],
        faculty: ["var(--font-faculty)"],
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        bold: "700",
      },
    },
  },
  plugins: [],
} satisfies Config;