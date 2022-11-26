import { Meta } from "@storybook/react";
import { Input } from "./Input";

const config: Meta<typeof Input> = {
  title: "Input",
  component: Input,
  args: {
    value: 30,
  },
};

export default config;

export const Default = () => {
  return <Input />;
};
