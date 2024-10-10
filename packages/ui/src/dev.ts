import {
  RecipeConfig as CodegenRecipeConfig,
  RecipeVariantRecord,
  SlotRecipeConfig as CodegenSlotRecipeConfig,
  SlotRecipeVariantRecord,
  SystemStyleObject as CodegenSystemStyleObject,
} from "@krds-prac/styled-system/types";
import { TextStyle } from "@krds-prac/styled-system/types/composition";
import type {
  RecipeConfig,
  SlotRecipeConfig,
  SystemStyleObject,
  TextStyles,
} from "@pandacss/dev";

function defineSafeRecipe<T extends RecipeVariantRecord>(
  config: CodegenRecipeConfig<T>,
): RecipeConfig {
  return config as RecipeConfig;
}

function defineSafeSlotRecipe<
  S extends string,
  T extends SlotRecipeVariantRecord<S>,
>(config: CodegenSlotRecipeConfig<S, T>): SlotRecipeConfig {
  return config as SlotRecipeConfig;
}

interface Token<T> {
  value: T;
  description?: string;
}

interface Recursive<T> {
  // @ts-expect-error this makes the textStyles typings happy
  value?: T;
  [key: string]: Recursive<T> | T;
}

export const define = {
  recipe: defineSafeRecipe,
  slotRecipe: defineSafeSlotRecipe,
  textStyle: (definition: TextStyle) => definition,
  styles: (styles: CodegenSystemStyleObject) => styles as SystemStyleObject,
  textStyles: (defs: Recursive<Token<TextStyle>>) => defs as TextStyles,
};
