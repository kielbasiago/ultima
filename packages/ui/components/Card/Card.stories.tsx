import type { Meta } from "@storybook/react";
import { ChangeEvent, useState } from "react";
import { Input } from "../Input/Input";
import { Slider } from "../Slider/Slider";
import { Card } from "./Card";

const config: Meta<typeof Card> = {
  title: "Card",
  component: Card,
};

export default config;

export const BNRExample = () => {
  const [value, setValue] = useState([25, 75]);
  const [minVal, maxVal] = value || [];
  const setMinVal = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number.parseInt(e.target.value);
    const vals = [...value];
    vals.splice(0, 1, val);
    setValue(vals);
  };
  const setMaxVal = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number.parseInt(e.target.value);
    const vals = [...value];
    vals.splice(1, 1, val);
    setValue(vals);
  };

  return (
    <Card title={"Starting Gold/Items"}>
      <div className={"flex flex-col gap-2"}>
        <div className={"flex justify-between"}>
          <h3>Price</h3>
          <div className={"flex flex-shrink gap-2"}>
            <Input
              min={0}
              max={100}
              step={1}
              onChange={setMinVal}
              type="number"
              value={minVal}
            />
            <Input
              min={0}
              max={100}
              step={1}
              onChange={setMaxVal}
              type="number"
              value={maxVal}
            />
          </div>
        </div>
        <div className={"flex gap-4"}>
          <Slider onChange={(val) => setValue(val)} range value={value} />
        </div>
      </div>
    </Card>
  );
};
