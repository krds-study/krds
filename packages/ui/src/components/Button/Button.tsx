import { button, ButtonVariant } from "@krds-prac/styled-system/recipes";
import type { ReactNode } from "react";

interface ButtonProps extends ButtonVariant {
  children: ReactNode;
  className?: string;
  appName: string;
}
export function Button({ children }: ButtonProps) {
  return (
    <button className={button({})}>
      sdfsdf
      {children}
    </button>
  );
}
