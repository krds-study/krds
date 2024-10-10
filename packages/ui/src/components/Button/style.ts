import { defineRecipe } from "@pandacss/dev";

export const buttonRecipe = defineRecipe({
  className: "button",
  base: {
    textAlign: "center",
    lineHeight: "20px",
    cursor: "pointer",
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "lighter",
    minWidth: "44px",
    minHeight: "44px",
    gap: "5px",
    _hover: {
      boxShadow: "rgba(0, 0, 0, 0.25) 0px 3px 3px",
    },
    _disabled: {
      cursor: "not-allowed",
    },
  },
  variants: {
    size: {
      small: {
        height: "44px",
        textStyle: "body_medium",
        paddingLeft: "8",
        paddingRight: "8",
      },
      medium: {
        height: "44px",
        fontSize: "lg",
        paddingLeft: "10",
        paddingRight: "10",
      },
      large: {
        height: "44px",
        fontSize: "small",
        paddingLeft: "16",
        paddingRight: "16",
      },
    },
  },
  defaultVariants: {
    size: "medium",
  },
});
