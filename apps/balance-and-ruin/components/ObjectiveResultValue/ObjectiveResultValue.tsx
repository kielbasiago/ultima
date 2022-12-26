import { RawObjectiveResult } from "~/types/objectives";
import last from "lodash/last";
import { Input, Slider } from "@ff6wc/ui";
import { useDispatch, useSelector } from "react-redux";
import { FlagLabel } from "~/components/FlagLabel/FlagLabel";
import { useRef } from "react";
import { useNumberScroll } from "~/utils/useNumberScroll";
import { renderDescription } from "~/utils/renderDescription";
import { selectObjective, setResultValue } from "~/state/objectiveSlice";

export type ObjectiveResultValueProps = {
  flag: string;
  metadata: RawObjectiveResult;
  onChange: (val: number[]) => any;
};

export const ObjectiveResultValue = ({
  flag,
  metadata,
  onChange,
}: ObjectiveResultValueProps) => {
  const dispatch = useDispatch();
  const objective = useSelector(selectObjective(flag));
  const value = objective.result.value ?? [];
  const { value_range: allowedValues } = metadata as { value_range: number[] };
  const minRef = useRef<HTMLInputElement>(null);
  const maxRef = useRef<HTMLInputElement>(null);

  useNumberScroll(minRef);
  useNumberScroll(maxRef);

  const parseValue = (val: string | number) => {
    return Number.parseFloat((val || "0").toString());
  };

  const [min, max] = value;

  const [minVal, maxVal] = value || [];
  const metaMin = allowedValues[0] as number;
  const metaMax = last(allowedValues) as number;
  const step = 1;

  const defaults = [metaMin, metaMax] as [number, number];

  const label = "";
  const description = ""; //hardDescription ?? schemaDescription;
  const helperText = renderDescription(description, value ?? defaults);

  const onValueChange = (value: number[]) => {
    onChange(value);
  };

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
            className={"max-w-[80px]"}
            ref={minRef}
            min={min}
            max={max}
            step={step}
            onChange={(e) =>
              onValueChange([
                parseValue(e.target.value),
                value?.[1] ?? max ?? metaMax,
              ])
            }
            type="number"
            value={minVal ?? defaults[0]}
          />
          <span className={"flex-shrink font-semibold"}>-</span>
          <Input
            className={"max-w-[80px]"}
            ref={maxRef}
            min={min}
            max={max}
            step={1}
            onChange={(e) =>
              onValueChange([
                value?.[0] ?? min ?? metaMax,
                parseValue(e.target.value),
              ])
            }
            type="number"
            value={maxVal ?? defaults[1]}
          />
        </div>
      </div>
      <div>
        <Slider
          min={metaMin}
          max={metaMax}
          step={step}
          onChange={(val) => onValueChange(val)}
          range
          value={value ?? (defaults as number[])}
        />
      </div>
    </div>
  );
};
