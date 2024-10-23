import { defineSemanticTokens } from "@pandacss/dev";

import color from "../../../../../design-tokens/src/color.tokens.json";
import type { SemanticColorToken } from "../../../type";
import { objectEntries } from "../../../utils";

const palette = objectEntries(color.palette).reduce(
  (acc, [color, colorShades]) => {
    objectEntries(colorShades).forEach(([shade, shadeValues]) => {
      const lightValue = shadeValues.light.$value;
      const darkValue = shadeValues.dark.$value;

      acc[`${color}_${shade}`] = {
        value: {
          base: lightValue,
          _dark: darkValue,
        },
      };
    });

    return acc;
  },
  {} as SemanticColorToken,
);

const key = objectEntries(color.key).reduce((acc, [color, colorShades]) => {
  Object.entries(colorShades).forEach(([shade, shadeValues]) => {
    const lightValue = shadeValues.light.$value;
    const darkValue = shadeValues.dark.$value;

    acc[`${color}_${shade}`] = {
      value: {
        base: lightValue,
        _dark: darkValue,
      },
    };
  });

  return acc;
}, {} as SemanticColorToken);

const point = Object.entries(color.point).reduce(
  (acc, [color, colorShades]) => {
    acc[`point${color}`] = {
      value: {
        base: colorShades.light.$value,
        _dark: colorShades.dark.$value,
      },
    };

    return acc;
  },
  {} as SemanticColorToken,
);

const system = Object.entries(color.system).reduce(
  (acc, [color, colorShades]) => {
    Object.entries(colorShades).forEach(([shade, shadeValues]) => {
      const lightValue = shadeValues.light.$value;
      const darkValue = shadeValues.dark.$value;

      acc[`${color}_${shade}`] = {
        value: {
          base: lightValue,
          _dark: darkValue,
        },
      };
    });

    return acc;
  },
  {} as SemanticColorToken,
);

export const colors = defineSemanticTokens.colors({
  palette,
  key,
  point,
  system,
});
