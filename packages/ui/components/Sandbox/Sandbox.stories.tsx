import { Meta } from "@storybook/react";
import { ChangeEvent, useState } from "react";
import { Card } from "../Card/Card";
import { Input } from "../Input/Input";
import { Slider } from "../Slider/Slider";

const config: Meta<typeof Card> = {
  title: "Sandbox",
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
    <div className="flex flex-wrap gap-4">
      <Card title={"Starting Gold/Items"} className={"flex-grow"}>
        <div className={"flex  flex-col flex-wrap gap-6"}>
          <div className={"flex flex-col gap-2 flex-grow"}>
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
          <div className={"flex flex-col gap-2 flex-grow"}>
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
        </div>
      </Card>
      <Card title={"Starting Gold/Items"} className={"flex-grow"}>
        <div className={"flex  flex-col flex-wrap gap-6"}>
          <div className={"flex flex-col gap-2 flex-grow"}>
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
          <div className={"flex flex-col gap-2 flex-grow"}>
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
        </div>
      </Card>
    </div>
  );
};
