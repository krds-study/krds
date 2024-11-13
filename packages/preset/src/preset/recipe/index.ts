import type { RecipeConfig, RecipeVariantRecord } from "@pandacss/dev";

import { button } from "./button";
import { textField } from "./textField";
export const recipes: Record<
  string,
  Partial<RecipeConfig<RecipeVariantRecord>>
> = {
  button,
};

export const slotRecipes = {
  textField,
};
