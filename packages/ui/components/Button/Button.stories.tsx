import { Meta, StoryFn } from "@storybook/react";
import { Button } from "./Button";

const config: Meta<typeof Button> = {
  title: "Button",
  component: Button,
};

export default config;

export const Default: StoryFn<typeof Button> = (args) => {
  return <Button {...args} />;
};

Default.args = {
  children: "Booton",
};
Default.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/6eUsua5CBum451v40t74K3/Intel-Pro-UI-Library?node-id=127%3A59&t=dGjqUmWTA2yOFDy4-1",
  },
};
