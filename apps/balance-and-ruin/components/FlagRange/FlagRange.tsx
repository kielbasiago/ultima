import last from "lodash/last";
import { Input, Slider, SliderProps } from "@ff6wc/ui";
import { useDispatch, useSelector } from "react-redux";
import { setFlag, useFlagValueSelector } from "~/state/flagSlice";
import {
  selectAllowedValues,
  selectDefaultValue,
  selectDescription,
  selectMax,
  selectMin,
  selectStep,
} from "~/state/schemaSlice";
import { FlagLabel } from "~/components/FlagLabel/FlagLabel";
import { useRef } from "react";
import { useNumberScroll } from "~/utils/useNumberScroll";
import { renderDescription } from "~/utils/renderDescription";

export type FlagRangeProps = {
  helperText?: React.ReactNode;
  flag: string;
  label: React.ReactNode;
  type?: "percent";
} & SliderProps<number[]>;

export const FlagRange = ({
  flag,
  defaultValue: hardDefault,
  helperText: hardDescription,
  label,
  type,
  ...rest
}: FlagRangeProps) => {
  const minRef = useRef<HTMLInputElement>(null);
  const maxRef = useRef<HTMLInputElement>(null);
  const value = useFlagValueSelector<number[]>(flag);

  const allowedValues = useSelector(selectAllowedValues(flag)) ?? [];
  const schemaDescription = useSelector(selectDescription(flag));
  const schemaMax = useSelector(selectMax(flag));
  const schemaMin = useSelector(selectMin(flag));
  const schemaStep = useSelector(selectStep(flag));
  const dispatch = useDispatch();

  useNumberScroll(minRef);
  useNumberScroll(maxRef);

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

  const defaultValue = useSelector(selectDefaultValue(flag));

  const defaults = (defaultValue ?? [min, max]) as [number, number];

  const description = hardDescription ?? schemaDescription;
  const helperText = renderDescription(description, value ?? defaults);

  return (
    <div className={"flex flex-col gap-2"}>
      <div className={"flex justify-between items-center gap-4"}>
        <div className="w-full">
          <FlagLabel
            flag={flag}
            helperText={helperText ?? description}
            label={label}
          />
        </div>
        <div className={"flex items-center justify-center flex-shrink gap-1"}>
          <Input
            ref={minRef}
            min={min}
            max={max}
            step={step}
            onChange={(e) =>
              onChange([parseValue(e.target.value), value?.[1] ?? max])
            }
            type="number"
            value={minVal ?? defaults[0]}
          />
          <span className={"flex-shrink font-semibold"}>-</span>
          <Input
            ref={maxRef}
            min={min}
            max={max}
            step={1}
            onChange={(e) =>
              onChange([value?.[0] ?? min, parseValue(e.target.value)])
            }
            type="number"
            value={maxVal ?? defaults[1]}
          />
          {/* <span className={"flex-shrink font-semibold"}>
            {type === "percent" ? "%" : null}
          </span> */}
        </div>
      </div>
      <div>
        <Slider
          min={min}
          max={max}
          step={step}
          onChange={(val) => onChange(val)}
          range
          value={value ?? (defaults as number[])}
          {...rest}
        />
      </div>
    </div>
  );
};
