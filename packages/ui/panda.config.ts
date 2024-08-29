import { defineConfig } from "@pandacss/dev"

export default defineConfig({
  preflight: true,
  presets: ["@pandacss/dev/presets"],
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  exclude: [],

  theme: {
    extend: {},
  },

  outdir: "../styled-system",
  importMap: {
    css: "@krds-prac/styled-system/css",
    recipes: "@krds-prac/styled-system/recipes",
    patterns: "@krds-prac/styled-system/patterns",
    jsx: "@krds-prac/styled-system/jsx",
  },
  jsxFramework: "react",
  syntax: "object-literal",
})
