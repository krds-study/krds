import { defineSlotRecipe } from "@pandacss/dev";

/**
 * TextField 컴포넌트의 스타일 recipe
 * @description 텍스트 입력을 위한 복합 컴포넌트입니다. 라벨, 입력창, 카운터로 구성됩니다.
 */
export const textField = defineSlotRecipe({
  className: "text-fields",
  slots: ["root", "label", "input", "counter"],

  base: {
    root: {
      display: "flex",
      width: "360px",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "12px",
      borderRadius: "8px",
      color: "key.gray_90",
      fontFamily: '"Pretendard GOV"',
      fontSize: "15px",
      fontWeight: "400",
      lineHeight: "150%",
    },
    label: {
      color: "key.gray_90",
      fontFamily: '"Pretendard GOV"',
      fontSize: "15px",
      fontWeight: "400",
      lineHeight: "150%",
    },
    input: {
      display: "flex",
      width: "360px",
      height: "144px",
      padding: "16px",
      alignItems: "flex-start",
      gap: "8px",
      borderRadius: "8px",
      border: "1px solid",
      borderColor: "key.gray_60",
      background: "key.gray_0",
      color: "key.gray_50",
      fontFamily: '"Pretendard GOV"',
      fontSize: "17px",
      fontWeight: "400",
      lineHeight: "150%",
      _focus: {
        borderWidth: "2px",
        borderColor: "key.primary_50",
        color: "key.gray_90",
      },
      _disabled: {
        borderColor: "key.gray_40",
        background: "key.gray_30",
        color: "key.gray_60",
      },
    },
    counter: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "flex-start",
      gap: "2px",
      alignSelf: "stretch",
      color: "key.gray_70",
      fontFamily: '"Pretendard GOV"',
      fontSize: "15px",
      fontWeight: "400",
      lineHeight: "150%",
      _leadingTrim: "both",
      _textEdge: "cap",
    },
  },

  variants: {
    state: {
      default: {},
      completed: {
        input: {
          display: "-webkit-box",
          color: "key.gray_90",
          fontFamily: "Noto Sans KR",
          fontSize: "16px",
        },
      },
      view: {
        input: {
          borderColor: "key.gray_40",
          background: "key.gray_30",
          color: "key.gray_90",
        },
      },
      error: {
        input: {
          borderColor: "system.danger_50",
        },
      },
    },
  },

  defaultVariants: {
    state: "default",
  },
});
