import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Slider, SliderProps } from "@ff6wc/ui";
import { selectFlagValue, setFlag } from "~/state/flagSlice";
import { InputLabel } from "~/components/InputLabel/InputLabel";

export type FlagSliderProps = {
  flag: string;
  label: string;
} & SliderProps<number>;

export const FlagSlider = ({ flag, label }: FlagSliderProps) => {
  const selectors = useMemo(() => selectFlagValue<number>(flag), [flag]);
  const value = useSelector(selectors) as number;
  const dispatch = useDispatch();

  const setValue = (val: number) => {
    dispatch(
      setFlag({
        flag: flag,
        value: val,
      })
    );
  };

  const parseValue = (val: string | number) => {
    return Number.parseInt((val || "0").toString());
  };

  const min = 0;
  const max = 100;
  const step = 1;
  return (
    <div className={"flex flex-col gap-2"}>
      <div className={"flex justify-between items-center"}>
        <InputLabel htmlFor={flag}>{label}</InputLabel>
        <div className={"flex flex-shrink gap-2"}>
          <Input
            min={min}
            max={max}
            step={step}
            onChange={(e) => setValue(parseValue(e.target.value))}
            type="number"
            value={value}
          />
        </div>
      </div>
      <div className={"flex gap-4"}>
        <Slider
          defaultValue={value}
          onChange={(val) => setValue(val)}
          value={value}
          min={0.5}
          max={5}
          step={0.5}
        />
      </div>
    </div>
  );
};
