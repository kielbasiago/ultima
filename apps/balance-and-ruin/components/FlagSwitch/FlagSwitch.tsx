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
  flag: string;
  /** Invert logic so when true, set to false, and vice versa. If value undefined, default to true. */
  invert?: boolean;
  label: string;
};

export const FlagSwitch = ({
  flag,
  invert = false,
  label,
}: FlagSwitchProps) => {
  const defaultValue = useSelector(selectDefaultValue(flag));
  const description = useSelector(selectDescription(flag));

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
    <div className="flex flex-col gap-1 max-w-[400px]">
      <div
        className={
          "flex items-center gap-4 justify-between max-w-[200px] cursor-pointer"
        }
        onClick={() => onChange(!checked)}
      >
        <InputLabel
          className={"cursor-pointer"}
          htmlFor={flag}
          onClick={() => onChange(!checked)}
        >
          {label}
        </InputLabel>
        <Switch checked={checked} onChange={(val) => onChange(val)} />
      </div>
      <HelperText>{description}</HelperText>
    </div>
  );
};
