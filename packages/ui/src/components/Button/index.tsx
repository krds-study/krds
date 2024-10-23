import { styled } from "@styled-system/jsx";
import { button } from "@styled-system/recipes";
import type { ComponentProps } from "@styled-system/types";

import { Button as ButtonBase } from "./Button";

export type ButtonProps = ComponentProps<typeof Button>;
export const Button = styled(ButtonBase, button);
