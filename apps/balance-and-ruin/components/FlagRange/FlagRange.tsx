import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Slider, SliderProps } from "@ff6wc/ui";
import { selectFlagValue, setFlag } from "~/state/flagSlice";
import { InputLabel } from "~/components/InputLabel/InputLabel";
import { selectSchema } from "~/state/schemaSlice";
import { AppState } from "~/state/store";

export type FlagRangeProps = {
  flag: string;
  label: string;
} & SliderProps<number[]>;

export const FlagRange = ({ flag, label, ...rest }: FlagRangeProps) => {
  const valueSelector = useMemo(() => selectFlagValue<number[]>(flag), [flag]);
  const schemaSelector = useMemo(() => selectSchema(flag), [flag]);
  const schema = useSelector(schemaSelector);
  const value = useSelector(valueSelector) as number[];

  const dispatch = useDispatch();

  const setValue = (val: number[]) => {
    dispatch(
      setFlag({
        flag: flag,
        value: val,
      })
    );
  };

  const parseValue = (val: string | number) => {
    return Number.parseFloat((val || "0").toString());
  };

  const [minVal, maxVal] = value || [];
  const min = schema.min ?? 0;
  const max = schema.max ?? 100;
  // const min = 0;
  // const max = 100;
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
            onChange={(e) => setValue([parseValue(e.target.value), value[1]])}
            type="number"
            value={minVal}
          />
          <Input
            min={min}
            max={max}
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
          min={min}
          max={max}
          step={step}
          onChange={(val) => setValue(val)}
          range
          value={value}
          {...rest}
        />
      </div>
    </div>
  );
};
