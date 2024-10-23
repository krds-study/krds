import { defineTokens } from "@pandacss/dev";

import shape from "../../../../../design-tokens/src/shape.tokens.json";
import { convertJsonToToken } from "../../../utils";

export const radii = defineTokens.radii(
  convertJsonToToken(shape.corner_radius),
);
