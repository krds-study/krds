import { defineTokens } from "@pandacss/dev";

import spacing from "../../../../../design-tokens/src/spacing.tokens.json";
import { convertJsonToToken } from "../../../utils";

export const space = defineTokens.spacing(convertJsonToToken(spacing));
