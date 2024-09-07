import { defineConfig } from "@pandacss/dev"
import { buttonRecipe } from "./src/components/Button/style"

export default defineConfig({
  preflight: true,
  presets: ["@pandacss/dev/presets"],
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  watch: true,
  theme: {
    extend: {
      recipes: {
        button: buttonRecipe,
      },
    },
  },
  outdir: "../styled-system/generated",
  importMap: {
    css: "@krds-prac/styled-system/generated/css",
    recipes: "@krds-prac/styled-system/generated/recipes",
    patterns: "@krds-prac/styled-system/generated/patterns",
    jsx: "@krds-prac/styled-system/generated/jsx",
  },
  staticCss: {
    recipes: {
      button: ["*"],
    },
  },
  jsxFramework: "react",
})
