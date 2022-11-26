import { ChangeEvent, useState } from "react";
import { Input } from "../Input/Input";
import { Slider } from "./Slider";

export default {
  title: "Slider",
  args: {
    value: 30,
  },
};

export const SingleSlider = () => {
  const [value, setValue] = useState(30);
  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(Number.parseInt(e.target.value));
  return (
    <div className={"flex flex-col gap-2"}>
      <div className={"flex justify-between"}>
        <h3>Price</h3>
        <Input
          min={0}
          max={100}
          step={1}
          onChange={onChange}
          type="number"
          value={value}
        />
      </div>
      <div className={"flex gap-4"}>
        <Slider onChange={(val) => setValue(val as number)} value={value} />
      </div>
    </div>
  );
};

export const RangeSlider = () => {
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
        <Slider onChange={(val) => setValue(val)} range value={value} />
      </div>
    </div>
  );
};
