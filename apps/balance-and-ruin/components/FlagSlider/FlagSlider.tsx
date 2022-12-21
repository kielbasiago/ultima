import { Input, Slider, SliderProps } from "@ff6wc/ui";
import first from "lodash/first";
import last from "lodash/last";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlagLabel } from "~/components/FlagLabel/FlagLabel";
import { setFlag, useFlagValueSelector } from "~/state/flagSlice";
import {
  selectAllowedValues,
  selectDefaultValue,
  selectDescription,
  selectMax,
  selectMin,
  selectStep,
} from "~/state/schemaSlice";
import { renderDescription } from "~/utils/renderDescription";
import { useNumberScroll } from "~/utils/useNumberScroll";

export type FlagSliderProps = {
  allowedValues?: number[];
  flag: string;
  helperText?: React.ReactNode;
  label: React.ReactNode;
} & SliderProps<number>;

export const FlagSlider = ({
  allowedValues: hardAllowed,
  flag,
  helperText: hardDescription,
  label,
  min: hardMin,
  max: hardMax,
  step: hardStep,
  ...rest
}: FlagSliderProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const value = useFlagValueSelector<number>(flag);

  const schemaAllowed = useSelector(selectAllowedValues(flag)) ?? [];
  const schemaDescription = useSelector(selectDescription(flag));
  const schemaDefaultValue = useSelector(selectDefaultValue(flag));
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

  const description = hardDescription ?? schemaDescription;
  const helperText = renderDescription(
    description,
    value ?? schemaDefaultValue ?? min
  );

  return (
    <div className={"flex flex-col gap-2"}>
      <div className={"flex justify-between items-center gap-4"}>
        <FlagLabel
          flag={flag}
          helperText={helperText ?? description}
          label={label}
        />
        <div className={"flex items-center justify-center flex-shrink gap-1"}>
          <Input
            className={"max-w-[80px]"}
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
          value={value ?? (schemaDefaultValue as number) ?? min}
          min={min}
          max={max}
          step={step}
        />
      </div>
    </div>
  );
};
