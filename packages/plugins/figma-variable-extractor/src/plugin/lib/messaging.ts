import {
  AppMessage,
  ExtractTokenAction,
  ExtractTokenActionPayload,
} from "../../types";

function requestToUI<T>(message: T) {
  figma.ui.postMessage(message);
}

export function responseExtractTokensToUI(payload: ExtractTokenActionPayload) {
  /**
   * @todo
   * 엄밀하게는 Plugin에서 App으로 보내는 메시지이므로 AppMessage의 타입을 사용하는 것이 좋지 못함. 양방향 메시지 전송 타입에 대해서 다시 설계할 필요가 있어 보임
   */
  requestToUI<AppMessage<ExtractTokenAction, ExtractTokenActionPayload>>({
    type: "extractTokens",
    payload,
  });
}
