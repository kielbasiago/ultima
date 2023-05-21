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
  FlagValue,
} from "~/state/schemaSlice";
import { useNumberScroll } from "~/utils/useNumberScroll";
import { HelperText } from "@ff6wc/ui";
import Mustache from "mustache";

export type DualFlagSliderProps = {
  allowedValues?: number[];
  flag: string;
  helperText?: React.ReactNode;
  label: React.ReactNode;
  aText: string;
  bText: string;
} & SliderProps<number[]>;

export const NumberSlider = ({
  ...rest
}: SliderProps<number>) => {
  return (
  <Slider {...rest} />
  );
};

export const DualFlagSlider = ({
  allowedValues: hardAllowed,
  flag,
  helperText: hardDescription,
  label,
  aText,
  bText,
  min: hardMin,
  max: hardMax,
  step: hardStep,
  ...rest
}: DualFlagSliderProps) => {
  const aRef = useRef<HTMLInputElement>(null);
  const bRef = useRef<HTMLInputElement>(null);
  const value = useFlagValueSelector<number[]>(flag);

  const schemaAllowed = useSelector(selectAllowedValues(flag)) ?? [];
  const schemaDescription = useSelector(selectDescription(flag));
  const schemaMax = useSelector(selectMax(flag));
  const schemaMin = useSelector(selectMin(flag));
  const schemaStep = useSelector(selectStep(flag));
  const dispatch = useDispatch();

  useNumberScroll(aRef);
  useNumberScroll(bRef);

  const allowedValues = hardAllowed ?? schemaAllowed;

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

  const [aVal, bVal] = value || [];
  const min = (
    hardMin ?? allowedValues.length ? first(allowedValues) : schemaMin ?? 0
  ) as number;
  const max = (
    hardMax ?? allowedValues.length ? last(allowedValues) : schemaMax ?? 100
  ) as number;

  const step = hardStep ?? schemaStep ?? 1;

  const defaultValue = useSelector(selectDefaultValue(flag));
  const defaults = (defaultValue ?? [min, max]) as [number, number];

  const description = hardDescription ?? schemaDescription;
  const renderDescription = (
    template: React.ReactNode,
    value: FlagValue
  ) => {
    if (typeof template !== "string") {
      return template;
    }
    if (Array.isArray(value)) {
      return Mustache.render(template, {"a": value?.[0] ?? min, "b": value?.[1] ?? min});
    }
    return template;
  };

  const onAChange = (
    val: number
  ) => {
    onChange([val, value?.[1] as number ?? min])
  };

  const onBChange = (
    val: number
  ) => { 
    onChange([value?.[0] ?? min, val])
  };
  const helperText = renderDescription(description, value ?? defaults);

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
            ref={aRef}
            min={min}
            max={max}
            step={step}
            onChange={(e) =>
              onChange([parseValue(e.target.value), value?.[1] ?? max])
            }
            type="number"
            value={aVal ?? defaults[0]}
          />
          <span className={"flex-shrink font-semibold"}> </span>
          <Input
            className={"max-w-[80px]"}
            ref={bRef}
            min={min}
            max={max}
            step={step}
            onChange={(e) =>
              onChange([value?.[0] ?? min, parseValue(e.target.value)])
            }
            type="number"
            value={bVal ?? defaults[1]}
          />
        </div>
      </div>
      <div>
        <HelperText>{aText}</HelperText>
        <NumberSlider
          onChange={(val) => onAChange(val)}
          defaultValue={value?.[0] ?? min}
          value={value?.[0] as number ??  min}
          min={min}
          max={max}
          step={step}
        />
        <HelperText>{bText}</HelperText>
        <NumberSlider
          onChange={(val) => onBChange(val)}
          defaultValue={value?.[1] ?? min}
          value={value?.[1] as number ?? min}
          min={min}
          max={max}
          step={step}
        />
      </div>
    </div>
  );
};
