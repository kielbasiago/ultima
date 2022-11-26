import { Meta } from "@storybook/react";
import { Button } from "./Button";

const config: Meta<typeof Button> = {
  title: "Button",
  component: Button,
};

export default config;

export const Default = () => {
  return <Button>Booton</Button>;
};
