import { HelperText, Input, Switch } from "@ff6wc/ui";
import { useMemo, useState } from "react";
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

export type FlagNumberInputProps = {
  description: string;
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
  const defaultValue = useSelector(selectDefaultValue(flag));
  const description = useSelector(selectDescription(flag));
  const max = useSelector(selectMax(flag)) ?? 0;
  const min = useSelector(selectMin(flag)) ?? 0;
  const step = useSelector(selectStep(flag));

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
    <div className="flex flex-col gap-1 max-w-[400px]">
      <div className={""}>
        <InputLabel className={"cursor-pointer"} htmlFor={flag}>
          {label}
        </InputLabel>
        <Input
          className="w-full"
          max={max ?? undefined}
          min={min ?? undefined}
          onChange={(e) => onChange(e.target.value)}
          step={step ?? undefined}
          type="number"
          value={value}
        />
      </div>
      <HelperText>{hardDescription ?? description}</HelperText>
    </div>
  );
};
