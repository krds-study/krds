export type TokenValue = {
  $type: VariableResolvedDataType;
  $value: VariableValue;
};

export type TokenFile = {
  fileName: string;
  body: TokenBody;
};

export type TokenBody = {
  [key: string]: TokenBody | TokenValue;
};
