import type { NextPage } from "next";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFlagValue, setFlag } from "~/state/flagSlice";
import { Card, Slider, Input } from "@ff6wc/ui";

const parseValue = (val: string | number) => {
  return Number.parseInt((val || "0").toString());
};

type FlagRangeProps = {
  flag: string;
  label: string;
};
const FlagRange = ({ flag, label }: FlagRangeProps) => {
  const selectors = useMemo(() => selectFlagValue<number[]>(flag), []);
  const value = useSelector(selectors) as number[];
  const dispatch = useDispatch();

  const setValue = (val: number[]) => {
    dispatch(
      setFlag({
        flag: flag,
        value: val,
      })
    );
  };

  const [minVal, maxVal] = value || [];

  return (
    <div className={"flex flex-col gap-2"}>
      <div className={"flex justify-between"}>
        <h3>{label}</h3>
        <div className={"flex flex-shrink gap-2"}>
          <Input
            min={0}
            max={100}
            step={1}
            onChange={(e) => setValue([parseValue(e.target.value), value[1]])}
            type="number"
            value={minVal}
          />
          <Input
            min={0}
            max={100}
            step={1}
            onChange={(e) => setValue([value[0], parseValue(e.target.value)])}
            type="number"
            value={maxVal}
          />
        </div>
      </div>
      <div className={"flex gap-4"}>
        <Slider
          defaultValue={value}
          onChange={(val) => setValue(val)}
          range
          value={value}
        />
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <Card title={"Items"}>
      <FlagRange flag="-csb" label="Cursed Shield Battles" />
    </Card>
  );
};

export default Home;
