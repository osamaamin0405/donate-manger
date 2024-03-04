/** @type {import('tailwindcss').Config} */

import { darkColorsTheme, lightColorsTheme } from "./src/css/index";

// import { theme } from "antd";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    borderColor: lightColorsTheme.border,
    dark: {
      borderColor: darkColorsTheme.border,
    },
    button: {
      backGround: lightColorsTheme.primary,
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
