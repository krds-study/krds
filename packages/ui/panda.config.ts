import { customPreset } from "@krds-prac/preset";
import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,
  presets: ["@pandacss/preset-base", customPreset()],
  conditions: {
    light: "[data-color-mode=light] &",
    dark: "[data-color-mode=dark] &",
  },
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./src/stories/*.{js,jsx,ts,tsx}"],
  jsxFramework: "react",
});
