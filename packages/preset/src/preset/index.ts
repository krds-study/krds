import { definePreset } from "@pandacss/dev";

import { button } from "./recipe";
import { textStyles } from "./textStyles";
import { radii, spacing } from "./token/basic";
import { colors } from "./token/semantic";

export const customPreset = definePreset({
  name: "customPreset",
  theme: {
    textStyles,
    tokens: {
      radii,
      spacing,
    },
    semanticTokens: {
      colors: {
        ...colors,
      },
    },
    recipes: {
      button,
    },
  },
});
