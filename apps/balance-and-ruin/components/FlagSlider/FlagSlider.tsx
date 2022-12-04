import { HelperText, Input, Slider, SliderProps } from "@ff6wc/ui";
import { useDispatch, useSelector } from "react-redux";
import first from "lodash/first";
import last from "lodash/last";
import { InputLabel } from "~/components/InputLabel/InputLabel";
import { setFlag, useFlagValueSelector } from "~/state/flagSlice";
import {
  selectAllowedValues,
  selectDescription,
  selectMax,
  selectMin,
  selectStep,
} from "~/state/schemaSlice";

export type FlagSliderProps = {
  allowedValues?: number[];
  flag: string;
  label: string;
} & SliderProps<number>;

export const FlagSlider = ({
  allowedValues: hardAllowed,
  flag,
  label,
  min: hardMin,
  max: hardMax,
  step: hardStep,
  ...rest
}: FlagSliderProps) => {
  const value = useFlagValueSelector<number>(flag);

  const schemaAllowed = useSelector(selectAllowedValues(flag)) ?? [];
  const description = useSelector(selectDescription(flag));
  const schemaMax = useSelector(selectMax(flag));
  const schemaMin = useSelector(selectMin(flag));
  const schemaStep = useSelector(selectStep(flag));
  const dispatch = useDispatch();

  const allowedValues = hardAllowed ?? schemaAllowed;

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
    hardMin ?? allowedValues.length ? first(allowedValues) : schemaMin ?? 0
  ) as number;
  const max = (
    hardMax ?? allowedValues.length ? last(allowedValues) : schemaMax ?? 100
  ) as number;

  const step = hardStep ?? schemaStep ?? 1;

  return (
    <div className={"flex flex-col"}>
      <div className={"flex justify-between items-center "}>
        <div className="flex flex-col min-w-[50%%]">
          {label ? <InputLabel htmlFor={flag}>{label}</InputLabel> : null}
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
      <div>
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
