import { ExtractTokenAction } from "../types/action";
import { AppMessage } from "../types/plugin";
import { TokenFile, TokenValue } from "../types/token";
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
    files.push(...(await processCollection(collection)));
  }

  console.log("files: ", files);

  return files;
}

async function processCollection(collection: VariableCollection): Promise<TokenFile[]> {
  const files: TokenFile[] = [];

  for (const mode of collection.modes) {
    const file: TokenFile = {
      fileName:
        collection.modes.length === 1
          ? `${collection.name}.tokens.json`
          : `${collection.name}.${mode.name}.tokens.json`,
      body: {},
    };

    for (const variableId of collection.variableIds) {
      const variable = await figma.variables.getVariableByIdAsync(variableId);
      if (variable) {
        const { name, resolvedType, valuesByMode } = variable;
        const value = valuesByMode[mode.modeId];

        if (value !== undefined) {
          const token = await createToken(resolvedType, value);
          if (token) {
            file.body[name.replace(/\//g, ".")] = token;
          }
        }
      }
    }

    files.push(file);
  }

  return files;
}

async function createToken(
  resolvedType: VariableResolvedDataType,
  value: VariableValue
): Promise<TokenValue | null> {
  switch (resolvedType) {
    case "BOOLEAN":
    case "STRING":
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
      return { $type: resolvedType, $value: `{${variable.name.replace(/\//g, ".")}}` };
    }
  }

  return null;
}