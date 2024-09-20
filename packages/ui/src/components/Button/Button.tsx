import { button } from "@krds-prac/styled-system/recipes";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
}
export function Button({ children }: ButtonProps) {
  return (
    <button className={button()}>
      sdfsdf
      {children}
    </button>
  );
}
