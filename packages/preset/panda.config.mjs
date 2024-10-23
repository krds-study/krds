import { defineConfig } from "@pandacss/dev";

import { customPreset } from "./src/preset";

export default defineConfig({
  presets: ["@pandacss/preset-base", customPreset],
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],
  jsxFramework: "react",

  // The output directory for your css system
  outdir: "generated",
  // importMap: "@krds-prac/styled-system",
  clean: true,
});
