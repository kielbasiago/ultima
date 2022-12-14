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
import { useRef } from "react";
import { useNumberScroll } from "~/utils/useNumberScroll";
import { FlagLabel } from "~/components/FlagLabel/FlagLabel";

export type FlagSliderProps = {
  allowedValues?: number[];
  flag: string;
  helperText?: React.ReactNode;
  label: React.ReactNode;
} & SliderProps<number>;

export const FlagSlider = ({
  allowedValues: hardAllowed,
  flag,
  helperText,
  label,
  min: hardMin,
  max: hardMax,
  step: hardStep,
  ...rest
}: FlagSliderProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const value = useFlagValueSelector<number>(flag);

  const schemaAllowed = useSelector(selectAllowedValues(flag)) ?? [];
  const description = useSelector(selectDescription(flag));
  const schemaMax = useSelector(selectMax(flag));
  const schemaMin = useSelector(selectMin(flag));
  const schemaStep = useSelector(selectStep(flag));
  const dispatch = useDispatch();

  useNumberScroll(ref);

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
    <div className={"flex flex-col gap-2"}>
      <div className={"flex justify-between items-center gap-4"}>
        <FlagLabel
          flag={flag}
          helperText={(helperText as string) ?? description}
          label={label}
        />
        <div className={"flex items-center justify-center flex-shrink gap-1"}>
          <Input
            min={min}
            max={max}
            step={step || 1}
            onChange={(e) => setValue(parseValue(e.target.value))}
            ref={ref}
            type="number"
            value={value ?? min}
          />
        </div>
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
