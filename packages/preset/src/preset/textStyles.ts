/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineTextStyles, type TextStyles } from "@pandacss/dev";

import typography from "../../../design-tokens/src/typography.tokens.json";
import { objectEntries, snakeToCamelCase } from "../utils";

export const textStyles = defineTextStyles(
  objectEntries(typography.type_scale).reduce((acc, [style, value]) => {
    objectEntries(value).forEach(([size, value]) => {
      const name = `${style}_${size}`;
      const props = objectEntries(value).reduce(
        (stypeProps, [key, value]) => {
          if (key === "size") {
            stypeProps["fontSize"] = value.$value;
          } else {
            stypeProps[snakeToCamelCase(key)] = value.$value;
          }
          return stypeProps;
        },
        {} as Record<string, any>,
      );
      acc[name] = { value: props };
    });
    return acc;
  }, {} as TextStyles),
);
