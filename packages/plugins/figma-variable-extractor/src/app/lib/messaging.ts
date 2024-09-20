import { AppMessage, ExtractTokenAction } from "../../types";

function requestToPlugin<T>(pluginMessage: T) {
  parent.postMessage({ pluginMessage }, "*");
}

export function requestExtractTokensToPlugin() {
  requestToPlugin<AppMessage<ExtractTokenAction>>({
    type: "extractTokens",
  });
}
