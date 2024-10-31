import { defineRecipe } from "@pandacss/dev";

export const button = defineRecipe({
  className: "button",
  base: {
    textAlign: "center",
    lineHeight: "20",
    borderRadius: "radius_1",
    cursor: "pointer",
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "medium",
    width: "1/12",
    minWidth: `var(--44px)`,
    minHeight: `var(--44px)`,
    gap: "5px",
    _hover: {
      boxShadow: "rgba(0, 0, 0, 0.25) 0px 3px 3px",
    },
    _disabled: {
      cursor: "not-allowed",
    },
  },
  // variants: {
  //   size: {
  //     small: {
  //       height: `var(--44px)`,
  //       fontSize: "large",
  //       paddingLeft: "8",
  //       paddingRight: "8",
  //     },
  //     medium: {
  //       height: `var(--44px)`,
  //       fontSize: "lg",
  //       paddingLeft: "10",
  //       paddingRight: "10",
  //     },
  //     large: {
  //       height: `var(--44px)`,
  //       fontSize: "lg",
  //       paddingLeft: "16",
  //       paddingRight: "16",
  //     },
  //   },
  //   br: {
  //     normal: {
  //       borderRadius: "radius_2",
  //     },
  //     rounded: {
  //       borderRadius: "radius_9",
  //     },
  //   },
  //   variant: {
  //     primary: {
  //       backgroundColor: "success_50",
  //       border: "none",
  //       color: "coral_5",
  //       _disabled: {
  //         opacity: 0.5,
  //         backgroundColor: "gray_40",
  //       },
  //     },
  //     text: {
  //       border: "2px solid",
  //       borderColor: "g",
  //       backgroundColor: "white",
  //       color: "text_secondary",
  //       _disabled: {
  //         opacity: 0.5,
  //       },
  //     },
  //   },
  // },
  // defaultVariants: {
  //   size: "medium",
  //   variant: "primary",
  //   br: "normal",
  // },
});
