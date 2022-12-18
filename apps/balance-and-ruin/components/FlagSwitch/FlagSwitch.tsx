import { HelperText, Switch } from "@ff6wc/ui";
import { useMemo, useState } from "react";
import {
  selectFlagValue,
  setFlag,
  useFlagValueSelector,
} from "~/state/flagSlice";
import { useDispatch, useSelector } from "react-redux";
import { InputLabel } from "~/components/InputLabel/InputLabel";
import { selectDefaultValue, selectDescription } from "~/state/schemaSlice";

export type FlagSwitchProps = {
  helperText?: string;
  flag: string;
  /** Invert logic so when true, set to false, and vice versa. If value undefined, default to true. */
  invert?: boolean;
  label: string;
};

export const FlagSwitch = ({
  helperText: hardDescription,
  flag,
  invert = false,
  label,
}: FlagSwitchProps) => {
  const defaultValue = useSelector(selectDefaultValue(flag));
  const schemaDescription = useSelector(selectDescription(flag));

  const value = useFlagValueSelector(flag) ?? defaultValue ?? false;

  const checked = invert ? Boolean(!value) : Boolean(value);

  const dispatch = useDispatch();

  const onChange = (value: boolean) => {
    dispatch(
      setFlag({
        flag,
        value: invert ? !value : value,
      })
    );
  };

  return (
    <div className="flex flex-col gap-1">
      <div
        className={"flex items-center gap-4  cursor-pointer"}
        onClick={() => onChange(!checked)}
      >
        <Switch checked={checked} onChange={(val) => onChange(val)} />
        <InputLabel
          className={"cursor-pointer"}
          htmlFor={flag}
          onClick={() => onChange(!checked)}
        >
          {label}
        </InputLabel>
      </div>
      <HelperText>{hardDescription ?? schemaDescription}</HelperText>
    </div>
  );
};
