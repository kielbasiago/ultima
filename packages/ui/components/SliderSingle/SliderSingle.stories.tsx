import { ChangeEvent, useState } from "react";
import { Input } from "../Input/Input";
import { SliderSingle } from "./SliderSingle";

export default {
  title: "Slider (Single)",
  args: {
    value: 30,
  },
};

export const SliderWithNumber = () => {
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
        <SliderSingle onChange={(val) => setValue(val)} value={value} />
      </div>
    </div>
  );
};
