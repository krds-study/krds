import { ExtractTokenAction } from "../types/action";
import { AppMessage } from "../types/plugin";
import { TokenBody, TokenFile, TokenValue } from "../types/token";
import { responseExtractTokensToUI } from "./lib/messaging";
import { isRGBA, isVariableAlias, rgbToHex } from "./utils";

figma.showUI(__html__);

figma.ui.onmessage = async (message: AppMessage<ExtractTokenAction>) => {
  if (message.type === "extractTokens") {
    const files = await extractTokens();
    responseExtractTokensToUI(files);
  }
};

async function extractTokens(): Promise<TokenFile[]> {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const files: TokenFile[] = [];

  for (const collection of collections) {
    files.push(await processCollection(collection));
  }

  files.forEach((file) => {
    file.body = convertToNested(file.body);
  });

  return files;
}

async function processCollection(
  collection: VariableCollection
): Promise<TokenFile> {
  const file: TokenFile = {
    fileName: `${collection.name}.tokens.json`,
    body: {},
  };

  for (const mode of collection.modes) {
    for (const variableId of collection.variableIds) {
      const variable = await figma.variables.getVariableByIdAsync(variableId);

      if (variable) {
        const { name, resolvedType, valuesByMode } = variable;
        const value = valuesByMode[mode.modeId];
        const token = await createToken(resolvedType, value);

        if (token) {
          if (token.$type === "COLOR") {
            file.body[name.replace(/\//g, ".")] = {
              ...file.body[name.replace(/\//g, ".")],
              [mode.name]: token,
            };
          } else {
            file.body[name.replace(/\//g, ".")] = token;
          }
        }
      }
    }
  }

  return file;
}

async function createToken(
  resolvedType: VariableResolvedDataType,
  value: VariableValue
): Promise<TokenValue | null> {
  switch (resolvedType) {
    case "BOOLEAN":
      return { $type: "BOOLEAN", $value: value };
    case "STRING":
      return { $type: "STRING", $value: value };
    case "COLOR":
      if (isRGBA(value)) {
        return { $type: "COLOR", $value: rgbToHex(value) };
      }
      break;
    case "FLOAT":
      if (typeof value === "number") {
        return { $type: "FLOAT", $value: value };
      }
      break;
    default:
      throw Error(`Unsupported type: ${resolvedType}`);
  }

  if (isVariableAlias(value)) {
    const variable = await figma.variables.getVariableByIdAsync(value.id);
    if (variable) {
      return {
        $type: resolvedType,
        $value: `{${variable.name.replace(/\//g, ".")}}`,
      };
    }
  }

  return null;
}

function convertToNested(obj: TokenBody): TokenBody {
  const result: TokenBody = {};

  for (const key in obj) {
    const parts: string[] = key.split(".");
    let current: TokenBody = result;
    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        current[part] = obj[key];
      } else {
        if (
          !current[part] ||
          typeof current[part] !== "object" ||
          "$type" in current[part]
        ) {
          current[part] = {};
        }
        current = current[part] as TokenBody;
      }
    });
  }

  return result;
}
