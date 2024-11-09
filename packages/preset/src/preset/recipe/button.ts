import { defineRecipe } from "@pandacss/dev";

export const button = defineRecipe({
  className: "button",
  base: {
    textAlign: "center",
    WebkitFontSmoothing: "antialiased", //ios에서 텍스트 렌더링 품질 향상
    borderRadius: "radius_2",
    cursor: "pointer",
    fontWeight: "bold",
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
    outline: "none",
    whiteSpace: "nowrap",
    minHeight: 44,
    minWidth: 44,
    _disabled: {
      cursor: "not-allowed",
    },
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: "key.primary_50",
        color: "key.primary_0",
        _hover: {
          backgroundColor: "key.primary_60",
        },
        _focusVisible: {
          //키보드 및 보조 기술 통해 초점 이동할 경우
          outline: "2px solid",
          outlineColor: "key.primary_50",
          outlineOffset: "1px",
        },
        _disabled: {
          backgroundColor: "key.primary_20",
          _hover: {
            background: "key.primary_20",
          },
        },
        _focus: {
          outline: "2px solid",
          outlineColor: "key.primary_50",
          outlineOffset: "2px",
        },
      },
      secondary: {
        backgroundColor: "key.primary_5",
        color: "key.primary_60",
        fontWeight: "normal",
        border: "1px solid",
        borderColor: "key.primary_50",
        _hover: {
          backgroundColor: "key.primary_20",
        },
        _focusVisible: {
          outline: "2px solid",
          outlineColor: "key.primary_10",
          outlineOffset: "2px",
        },
        _disabled: {
          backgroundColor: "key.primary_20",
          _hover: {
            background: "key.primary_20",
          },
        },
        _active: {
          backgroundColor: "key.primary_30",
        },
      },
      tertiary: {
        backgroundColor: "key.primary_0",
        fontWeight: "normal",
        border: "1px solid",
        borderColor: "key.gray_90",
        color: "key.secondary_90",
        _hover: {
          backgroundColor: "key.secondary_5",
        },
        _focusVisible: {
          outline: "2px solid",
          outlineColor: "key.primary_90",
          outlineOffset: "2px",
        },
        _active: {
          backgroundColor: "key.secondary_10",
        },
      },
    },
    size: {
      "x-small": {
        height: "3.2rem",
        paddingLeft: "8",
        paddingRight: "8",
        borderRadius: "radius_3",
      },
      small: {
        height: "4rem",
        paddingLeft: "12",
        paddingRight: "12",
        borderRadius: "radius_3",
      },
      medium: {
        height: "4.8rem",
        paddingLeft: "1.6rem",
        paddingRight: "1.6rem",
        borderRadius: "radius_4",
      },
      large: {
        height: "5.6rem",
        paddingLeft: "2rem",
        paddingRight: "2rem",
        borderRadius: "radius_5",
      },
      "x-large": {
        height: "6.4rem",
        paddingLeft: "2.4rem",
        paddingRight: "2.4rem",
        borderRadius: "radius_6",
      },
    },
  },
  defaultVariants: {
    variant: "tertiary",
    size: "large",
  },
});
