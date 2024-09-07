import { ReactNode } from "react"
import { button } from "@krds-prac/styled-system/recipes"
interface ButtonProps {
  children: ReactNode
  className?: string
  appName: string
}

export const Button = ({ children }: ButtonProps) => {
  return <button className={button()}>{children}</button>
}
