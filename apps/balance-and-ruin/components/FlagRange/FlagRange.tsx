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
  const {
    defaultValue,
    description,
    max: schemaMax,
    min: schemaMin,
  } = useSelector(schemaSelector);
  const value = useSelector(valueSelector) as number[];

  const dispatch = useDispatch();
  const defaults = defaultValue as [number, number];
  const onChange = (val: number[]) => {
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
  const min = schemaMin ?? 0;
  const max = schemaMax ?? 100;
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
            onChange={(e) => onChange([parseValue(e.target.value), value[1]])}
            type="number"
            value={minVal ?? defaults[0]}
          />
          <Input
            min={min}
            max={max}
            step={1}
            onChange={(e) => onChange([value[0], parseValue(e.target.value)])}
            type="number"
            value={maxVal ?? defaults[1]}
          />
        </div>
      </div>
      <div className={"flex gap-4"}>
        <Slider
          min={min}
          max={max}
          step={step}
          onChange={(val) => onChange(val)}
          range
          value={value ?? defaultValue}
          {...rest}
        />
      </div>
    </div>
  );
};
