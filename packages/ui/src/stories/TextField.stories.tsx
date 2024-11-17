import type { Meta, StoryObj } from "@storybook/react";

import { TextField } from "../components/TextField";

export default {
  title: "TextField",
  component: TextField,
  argTypes: {
    state: {
      control: "select",
      options: ["default", "focused", "disabled", "completed", "view", "error"],
      defaultValue: "default",
      description: "텍스트 필드의 상태를 설정합니다",
    },
    maxLength: {
      control: "number",
      description: "최대 입력 가능한 문자 수를 설정합니다",
    },
    value: {
      control: "text",
      description: "텍스트 필드의 값을 설정합니다",
    },
    defaultValue: {
      control: "text",
      description: "텍스트 필드의 초기값을 설정합니다",
    },
  },
} satisfies Meta<typeof TextField>;

type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    value:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus.",
  },
  render: args => {
    return (
      <TextField {...args}>
        <TextField.Label>라벨</TextField.Label>
        <TextField.Input disabled={true} />
        <TextField.Counter />
      </TextField>
    );
  },
};
