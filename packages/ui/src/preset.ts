import { definePreset, defineTextStyles } from "@pandacss/dev";

import { designTokens } from "../transformToken";
import { buttonRecipe } from "./components/Button/style";

export const customPreset = definePreset({
  name: "customPreset",
  theme: {
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
});
