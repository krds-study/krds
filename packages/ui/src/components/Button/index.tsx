import { button } from "@styled-system/recipes";
import type { ComponentPropsWithRef, ReactNode } from "react";
import { forwardRef } from "react";

export interface ButtonProps extends ComponentPropsWithRef<"button"> {
  children: ReactNode;
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <button ref={ref} className={button({})} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
