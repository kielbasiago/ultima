import last from "lodash/last";
import { Input, Slider, SliderProps } from "@ff6wc/ui";
import { useDispatch } from "react-redux";
import { InputLabel } from "~/components/InputLabel/InputLabel";
import { setFlag, useFlagValueSelector } from "~/state/flagSlice";
import { useSchemaSelector } from "~/state/schemaSlice";

export type FlagRangeProps = {
  flag: string;
  label: string;
} & SliderProps<number[]>;

export const FlagRange = ({ flag, label, ...rest }: FlagRangeProps) => {
  const value = useFlagValueSelector<number[]>(flag);

  const {
    allowedValues,
    defaultValue,
    description,
    max: schemaMax,
    min: schemaMin,
  } = useSchemaSelector(flag);

  const dispatch = useDispatch();
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
  const min = (
    allowedValues.length ? allowedValues[0] : schemaMin ?? 0
  ) as number;
  const max = (
    allowedValues.length ? last(allowedValues) : schemaMax ?? 100
  ) as number;
  const step = 1;

  const defaults = (defaultValue ?? [min, max]) as [number, number];

  return (
    <div className={"flex flex-col gap-2"}>
      <div className={"flex justify-between items-center"}>
        <InputLabel htmlFor={flag}>{label}</InputLabel>
        <div className={"flex flex-shrink gap-2"}>
          <Input
            min={min}
            max={max}
            step={step}
            onChange={(e) =>
              onChange([parseValue(e.target.value), value?.[1] ?? max])
            }
            type="number"
            value={minVal ?? defaults[0]}
          />
          <Input
            min={min}
            max={max}
            step={1}
            onChange={(e) =>
              onChange([value?.[0] ?? min, parseValue(e.target.value)])
            }
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
          value={value ?? (defaultValue as number[])}
          {...rest}
        />
      </div>
    </div>
  );
};
