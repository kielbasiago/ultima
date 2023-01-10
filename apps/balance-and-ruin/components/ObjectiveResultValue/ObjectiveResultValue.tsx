import { Input, Slider } from "@ff6wc/ui";
import last from "lodash/last";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { FlagLabel } from "~/components/FlagLabel/FlagLabel";
import { setFlag } from "~/state/flagSlice";
import { setResultValue } from "~/state/objectiveSlice";
import { Objective, RawObjectiveResult } from "~/types/objectives";
import { createObjective } from "~/utils/createObjective";
import { objectiveToString } from "~/utils/objectiveToString";
import { renderDescription } from "~/utils/renderDescription";
import { useNumberScroll } from "~/utils/useNumberScroll";

export type ObjectiveResultValueProps = {
  objective: Objective;
  metadata: RawObjectiveResult;
};

export const ObjectiveResultValue = ({
  objective,
  metadata,
}: ObjectiveResultValueProps) => {
  const dispatch = useDispatch();
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
    // update objective store
    dispatch(
      setResultValue({
        flag: objective.flag,
        value,
      })
    );

    const newObjective = createObjective(objective, metadata);
    newObjective.result.value = value;
    const newValue = objectiveToString(newObjective);

    dispatch(
      setFlag({
        flag: objective.flag,
        value: newValue,
      })
    );
  };

  return (
    <div className={"flex flex-col gap-2"}>
      <div className={"flex justify-between items-center gap-4"}>
        <div className="w-full">
          <FlagLabel
            flag={objective.flag}
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
          markActiveValues
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
