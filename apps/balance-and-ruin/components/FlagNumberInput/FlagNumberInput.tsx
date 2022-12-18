import { HelperText, Input, Switch } from "@ff6wc/ui";
import { useMemo, useRef, useState } from "react";
import {
  selectFlagValue,
  setFlag,
  useFlagValueSelector,
} from "~/state/flagSlice";
import { useDispatch, useSelector } from "react-redux";
import { InputLabel } from "~/components/InputLabel/InputLabel";
import {
  selectDefaultValue,
  selectDescription,
  selectMax,
  selectMin,
  selectStep,
} from "~/state/schemaSlice";
import { FlagLabel } from "~/components/FlagLabel/FlagLabel";
import { useNumberScroll } from "~/utils/useNumberScroll";
import { renderDescription } from "~/utils/renderDescription";

export type FlagNumberInputProps = {
  description?: string;
  flag: string;
  label: string;
  type: "int";
};

export const FlagNumberInput = ({
  description: hardDescription,
  flag,
  label,
  type,
}: FlagNumberInputProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const defaultValue = useSelector(selectDefaultValue(flag));
  const schemaDescription = useSelector(selectDescription(flag));
  const max = useSelector(selectMax(flag)) ?? 0;
  const min = useSelector(selectMin(flag)) ?? 0;
  const step = useSelector(selectStep(flag));

  useNumberScroll(ref);

  const value =
    useFlagValueSelector<number>(flag) ?? defaultValue?.toString() ?? "";

  const dispatch = useDispatch();

  const onChange = (rawValue: string) => {
    let value: number | null =
      type === "int" ? Number.parseInt(rawValue) : Number.parseFloat(rawValue);

    if (Number.isNaN(value)) {
      value = null;
    } else if (value > max) {
      value = max;
    } else if (value < min) {
      value = min;
    }

    dispatch(
      setFlag({
        flag,
        value,
      })
    );
  };

  return (
    <div className="flex flex-col gap-1">
      <div className={"flex flex-col gap-1"}>
        <FlagLabel
          flag={flag}
          helperText={renderDescription(
            hardDescription ?? schemaDescription,
            value
          )}
          label={label}
        />

        <Input
          className="w-full"
          max={max ?? undefined}
          min={min ?? undefined}
          onChange={(e) => onChange(e.target.value)}
          ref={ref}
          step={step ?? undefined}
          type="number"
          value={value}
        />
      </div>
    </div>
  );
};
