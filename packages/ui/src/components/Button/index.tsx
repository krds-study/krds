import { cx } from "@styled-system/css";
import { button, ButtonVariant } from "@styled-system/recipes";
import type { ComponentPropsWithRef, ReactNode } from "react";
import { forwardRef } from "react";

export interface ButtonProps
  extends ComponentPropsWithRef<"button">,
    ButtonVariant {
  children: ReactNode;
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cx(button({ ...props }))}
        disabled={disabled}
        aria-disabled={disabled}
        role="button"
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
