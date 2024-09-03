import { Button } from "@krds-prac/ui"

import type { Meta, StoryObj } from "@storybook/react"
export default {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof Button>

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    className: "test",
  },
}
