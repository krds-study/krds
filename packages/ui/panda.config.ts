import { defineConfig } from "@pandacss/dev";

import { customPreset } from "../preset/dist";

export default defineConfig({
  preflight: true,
  presets: [customPreset],
  conditions: {
    light: "[data-color-mode=light] &",
    dark: "[data-color-mode=dark] &",
  },
  eject: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  strictTokens: true,
  minify: true,
  clean: true,
  jsxFramework: "react",
});
