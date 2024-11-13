import { definePreset } from "@pandacss/dev";

import { recipes, slotRecipes } from "./recipe";
import { textStyles } from "./textStyles";
import { radii, spacing } from "./token/basic";
import { colors } from "./token/semantic";

export const customPreset = () =>
  definePreset({
    name: "customPreset",
    theme: {
      extend: {
        textStyles,
        recipes,
        slotRecipes,
        tokens: {
          radii,
          spacing,
        },
        semanticTokens: {
          colors: {
            ...colors,
          },
        },
      },
    },
    staticCss: { recipes: "*" },
  });
