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
  flag: string;
  label: string;
  type: "int";
};

export const FlagNumberInput = ({
  flag,
  label,
  type,
}: FlagNumberInputProps) => {
  const defaultValue = useSelector(selectDefaultValue(flag));
  const description = useSelector(selectDescription(flag));
  const schemaMax = useSelector(selectMax(flag));
  const schemaMin = useSelector(selectMin(flag));
  const schemaStep = useSelector(selectStep(flag));

  const value =
    useFlagValueSelector<number>(flag) ?? defaultValue?.toString() ?? "";

  const dispatch = useDispatch();

  const onChange = (rawValue: string) => {
    const value =
      type === "int" ? Number.parseInt(rawValue) : Number.parseFloat(rawValue);

    dispatch(
      setFlag({
        flag,
        value,
      })
    );
  };

  return (
    <div className="flex flex-col gap-1 max-w-[400px]">
      <div className={"flex items-center gap-4 justify-between max-w-[200px]"}>
        <InputLabel className={"cursor-pointer"} htmlFor={flag}>
          {label}
        </InputLabel>
        <Input
          max={schemaMax ?? undefined}
          min={schemaMin ?? undefined}
          onChange={(e) => onChange}
          step={schemaStep ?? undefined}
          type="number"
          value={value}
        />
      </div>
      <HelperText>{description}</HelperText>
    </div>
  );
};
