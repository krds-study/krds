import { defineSlotRecipe } from "@pandacss/dev";

export const textField = defineSlotRecipe({
  className: "text-field",
  description: "A text field style recipe",
  slots: ["root", "label", "input", "counter"],
  base: {
    root: {
      display: "flex",
      width: "360px",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "12px",
      borderRadius: "8px",
      fontFamily: "Pretendard GOV",
      fontSize: "15px",
      fontWeight: "400",
      lineHeight: "150%",
      fontStyle: "normal",
      color: "var(--gray-gray-90, #1D1D1D)",
    },
    label: {
      fontFamily: "Pretendard GOV",
      fontSize: "15px",
      fontWeight: "400",
      lineHeight: "150%",
      color: "var(--gray-gray-90, #1D1D1D)",
    },
    input: {
      display: "block",
      width: "360px",
      height: "144px",
      padding: "16px",
      alignItems: "flex-start",
      gap: "8px",
      borderRadius: "8px",
      border: "1px solid var(--key-gray-60, #717171)",
      background: "var(--gray-gray-0, #FFF)",
      fontFamily: "Pretendard GOV",
      fontSize: "17px",
      fontWeight: "400",
      lineHeight: "150%",
      color: "var(--gray-gray-50, #8E8E8E)",
    },
    counter: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "flex-start",
      gap: "2px",
      alignSelf: "stretch",
      fontFamily: "Pretendard GOV",
      fontSize: "15px",
      fontWeight: "400",
      lineHeight: "150%",
      color: "var(--gray-gray-70, #555)",
      leadingTrim: "both",
      textEdge: "cap",
    },
  },
  variants: {
    state: {
      default: {},
      disabled: {
        input: {
          border: "1px solid var(--key-gray-40, #C6C6C6)",
          background: "var(--key-gray-30, #D8D8D8)",
          color: "var(--gray-gray-60, #717171)",
        },
        counter: {
          display: "none",
        },
      },
      view: {
        input: {
          border: "1px solid var(--key-gray-40, #C6C6C6)",
          background: "var(--key-gray-30, #D8D8D8)",
          color: "var(--gray-gray-90, #1D1D1D)",
        },
        counter: {
          display: "none",
        },
      },
      error: {
        input: {
          border: "1px solid var(--system-danger-50, #EB003B)",
        },
        counter: {
          display: "none",
        },
      },
      focused: {
        input: {
          border: "2px solid var(--key-primary-50, #246BEB)",
          color: "var(--gray-gray-90, #1D1D1D)",
        },
      },
      completed: {
        input: {
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: "5",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: "var(--gray-gray-90, #1D1D1D)",
          fontFamily: "Noto Sans KR",
          fontSize: "16px",
        },
      },
    },
  },
  defaultVariants: {
    state: "default",
  },
});
