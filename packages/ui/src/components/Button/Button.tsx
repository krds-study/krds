import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
}
export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
