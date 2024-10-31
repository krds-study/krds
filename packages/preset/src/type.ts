export type JsonType = Record<string, { $type: string; $value: string }>;
export type SemanticColorToken = Record<
  string,
  { value: { base: string; _dark: string } }
>;

export type Token = Record<string, { value: string }>;
