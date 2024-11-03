import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../components/Button";

export default {
  title: "Button",
  component: Button,
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "버튼",
    disabled: true,
    size: {},
  },
};
