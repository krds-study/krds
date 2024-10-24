import { definePreset } from "@pandacss/dev";

import { recipes } from "./recipe";
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
  });
