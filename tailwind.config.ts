import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkKnight: {
          primary: "#161b22",
          secondary: "#0d1117",
          accent: "#66fcf1",
          text: "#f2f2f2",
          navbarBg: "#0d111d",
        },
      },
    },
  },
  plugins: [],
};
export default config;
