import { defineConfig } from "@pandacss/dev";

import { customPreset } from "./src/preset";

export default defineConfig({
  presets: ["@pandacss/preset-base", customPreset],
  conditions: {
    light: "[data-color-mode=light] &",
    dark: "[data-color-mode=dark] &",
  },
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  minify: true,
  preflight: true,
  eject: true,
  watch: true,
  clean: true,
  theme: {},
  outdir: "../styled-system/generated",
  importMap: "@krds-prac/styled-system",
  staticCss: {
    recipes: {
      button: ["*"],
    },
  },
  jsxFramework: "react",
});
