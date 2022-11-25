import { ChangeEvent, useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Input } from "../Input/Input";
import { SliderRange } from "./SliderRange";

export default {
  title: "Slider (Range)",
  args: {
    value: [25, 75],
  },
};

export const SliderWithNumber = () => {
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
        <SliderRange onChange={(val) => setValue(val)} value={value} />
      </div>
    </div>
  );
};
