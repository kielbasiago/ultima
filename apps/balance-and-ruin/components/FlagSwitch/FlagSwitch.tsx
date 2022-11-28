import { Switch } from "@ff6wc/ui";
import { useMemo } from "react";
import { selectFlagValue, setFlag } from "~/state/flagSlice";
import { useDispatch, useSelector } from "react-redux";
import { InputLabel } from "~/components/InputLabel/InputLabel";

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
  const selector = useMemo(() => selectFlagValue<boolean>(flag), [flag]);
  const value = useSelector(selector) ?? false;
  const checked = invert ? !value : value;

  const dispatch = useDispatch();

  const setValue = (value: boolean) => {
    dispatch(
      setFlag({
        flag,
        value: invert ? !value : value,
      })
    );
  };

  return (
    <div className="cursor-text">
      <div className={"flex items-center gap-4 justify-between max-w-[200px]"}>
        <InputLabel
          className={"cursor-pointer"}
          htmlFor={flag}
          onClick={() => setValue(!checked)}
        >
          {label}
        </InputLabel>
        <Switch checked={checked} onChange={(val) => setValue(val)} />
      </div>
    </div>
  );
};
