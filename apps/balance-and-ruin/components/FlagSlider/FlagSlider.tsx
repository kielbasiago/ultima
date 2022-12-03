import { HelperText, Input, Slider, SliderProps } from "@ff6wc/ui";
import { useDispatch } from "react-redux";
import last from "lodash/last";
import { InputLabel } from "~/components/InputLabel/InputLabel";
import { setFlag, useFlagValueSelector } from "~/state/flagSlice";
import { useSchemaSelector } from "~/state/schemaSlice";

export type FlagSliderProps = {
  flag: string;
  label: string;
} & SliderProps<number>;

export const FlagSlider = ({
  flag,
  label,
  min: hardMin,
  max: hardMax,
  step: hardStep,
  ...rest
}: FlagSliderProps) => {
  const value = useFlagValueSelector<number>(flag);
  const {
    allowedValues,
    defaultValue,
    description,
    max: schemaMax,
    min: schemaMin,
    step: schemaStep,
  } = useSchemaSelector(flag);
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
    return Number.parseFloat((val || "0").toString());
  };

  const min = (
    hardMin ?? allowedValues ? allowedValues[0] : schemaMin ?? 0
  ) as number;
  const max = (
    hardMax ?? allowedValues ? last(allowedValues) : schemaMax ?? 100
  ) as number;

  const step = hardStep ?? schemaStep ?? 1;

  return (
    <div className={"flex flex-col"}>
      <div className={"flex justify-between items-center"}>
        <div className="flex flex-col">
          <InputLabel htmlFor={flag}>{label}</InputLabel>
          <HelperText>{description}</HelperText>
        </div>
        <Input
          min={min}
          max={max}
          step={step || 1}
          onChange={(e) => setValue(parseValue(e.target.value))}
          type="number"
          value={value ?? min}
        />
      </div>
      <div className={"mt-3"}>
        <Slider
          {...rest}
          defaultValue={value ?? min}
          onChange={(val) => setValue(val)}
          value={value ?? min}
          min={min}
          max={max}
          step={step}
        />
      </div>
    </div>
  );
};
