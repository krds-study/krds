import { defineConfig, defineTextStyles } from "@pandacss/dev";

import { buttonRecipe } from "./src/components/Button/style";
import { designTokens } from "./transformToken";

export default defineConfig({
  preflight: true,
  presets: ["@pandacss/preset-base"],
  conditions: {
    light: "[data-color-mode=light] &",
    dark: "[data-color-mode=dark] &",
  },
  eject: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  strictTokens: true,
  minify: true,
  utilities: {
    color: {
      values: "colors",
    },
  },
  theme: {
    extend: {
      textStyles: defineTextStyles(designTokens.textStyles),
      tokens: {
        radii: designTokens.radius,
      },
      semanticTokens: {
        colors: {
          ...designTokens.palette,
          ...designTokens.SEMANTIC_KEY_COLOR,
          ...designTokens.SEMANTIC_POINT_COLOR,
          ...designTokens.SEMANTIC_SYSTEM_COLOR,
        },
      },
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
});
