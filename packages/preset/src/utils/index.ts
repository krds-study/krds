import type { JsonType, Token } from "../type";

type ObjectKeys<T extends Record<PropertyKey, unknown>> =
  `${Exclude<keyof T, symbol>}`;

export const objectEntries = <Type extends Record<PropertyKey, unknown>>(
  obj: Type,
): Array<[ObjectKeys<Type>, Type[ObjectKeys<Type>]]> => {
  return Object.entries(obj) as Array<
    [ObjectKeys<Type>, Type[ObjectKeys<Type>]]
  >;
};

export const snakeToCamelCase = (str: string) => {
  return str.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase());
};

export const convertJsonToToken = (obj: JsonType) =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    acc[`radius_${key}`] = { value: value.$value };
    return acc;
  }, {} as Token);
