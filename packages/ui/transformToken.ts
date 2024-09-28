/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TextStyles } from "@pandacss/dev";

import color from "../design-tokens/src/color.tokens.json";
import shape from "../design-tokens/src/shape.tokens.json";
import spacing from "../design-tokens/src/spacing.tokens.json";
import typography from "../design-tokens/src/typography.tokens.json";

type JsonType = Record<string, { $type: string; $value: string }>;
type SemanticColorToken = Record<
  string,
  { value: { base: string; _dark: string } }
>;

type Token = Record<string, { value: string }>;

type ObjectKeys<T extends Record<PropertyKey, unknown>> =
  `${Exclude<keyof T, symbol>}`;

function objectEntries<Type extends Record<PropertyKey, unknown>>(
  obj: Type,
): Array<[ObjectKeys<Type>, Type[ObjectKeys<Type>]]> {
  return Object.entries(obj) as Array<
    [ObjectKeys<Type>, Type[ObjectKeys<Type>]]
  >;
}

function snakeToCamelCase(str: string) {
  return str.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase());
}

const convertJsonToToken = (obj: JsonType) =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    acc[`radius_${key}`] = { value: value.$value };
    return acc;
  }, {} as Token);

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
const SEMANTIC_KEY_COLOR = objectEntries(color.key).reduce(
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

const SEMANTIC_POINT_COLOR = Object.entries(color.point).reduce(
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

const SEMANTIC_SYSTEM_COLOR = Object.entries(color.system).reduce(
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

const radius = convertJsonToToken(shape.corner_radius);

const space = convertJsonToToken(spacing);

const textStyles = objectEntries(typography.type_scale).reduce(
  (acc1, [style, value]) => {
    objectEntries(value).forEach(([size, value]) => {
      const name = `${style}_${size}`;
      const props = objectEntries(value).reduce(
        (acc, [key, value]) => {
          if (key === "size") {
            acc["fontSize"] = value.$value;
          } else {
            acc[snakeToCamelCase(key)] = value.$value;
          }
          return acc;
        },
        {} as Record<string, any>,
      );
      acc1[name] = { value: props };
    });
    return acc1;
  },
  {} as TextStyles,
);

export const designTokens = {
  palette,
  SEMANTIC_KEY_COLOR,
  SEMANTIC_POINT_COLOR,
  SEMANTIC_SYSTEM_COLOR,
  radius,
  space,
  textStyles,
};
