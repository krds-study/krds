import { Button } from "../../../packages/ui/src/button"

import type { Meta, StoryObj } from "@storybook/react"
export default {
  title: "Button",
  component: Button,

  tags: ["autodocs"],
} satisfies Meta<typeof Button>

type Story = StoryObj<typeof Button>

export const Primary: Story = {}
