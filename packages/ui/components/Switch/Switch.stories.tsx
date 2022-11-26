import { ChangeEvent, useState } from "react";
import { Input } from "../Input/Input";
import { Switch } from "./Switch";

export default {
  title: "Switch",
};

export const Default = () => {
  const [checked, setChecked] = useState(true);

  return (
    <div className={"flex flex-col gap-2"}>
      <div className={"flex justify-between"}>
        <Switch onChange={(val) => setChecked(val)} checked={checked} />
      </div>
    </div>
  );
};

export const SwitchWithLabel = () => {
  const [checked, setChecked] = useState(true);

  return (
    <div className={"flex flex-col gap-2"}>
      <div className={"flex items-center gap-4"}>
        <h3>Price</h3>
        <Switch onChange={(val) => setChecked(val)} checked={checked} />
      </div>
    </div>
  );
};
