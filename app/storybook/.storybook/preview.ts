import type { Preview } from "@storybook/react";
import "../index.css";
import "@krds-prac/styled-system/styles.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
  },
};

export default preview;
