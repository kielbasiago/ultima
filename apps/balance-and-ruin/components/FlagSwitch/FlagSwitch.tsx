import { HelperText, Switch } from "@ff6wc/ui";
import { useMemo } from "react";
import { selectFlagValue, setFlag } from "~/state/flagSlice";
import { useDispatch, useSelector } from "react-redux";
import { InputLabel } from "~/components/InputLabel/InputLabel";
import { useSchemaSelector } from "~/state/schemaSlice";

export type FlagSwitchProps = {
  flag: string;
  /** Invert logic so when true, set to false, and vice versa. If value undefined, default to true. */
  invert?: boolean;
  label: string;
}; // const schema = useSelector(schemaSelector);

export const FlagSwitch = ({
  flag,
  invert = false,
  label,
}: FlagSwitchProps) => {
  const valueSelector = useMemo(() => selectFlagValue<boolean>(flag), [flag]);

  const { defaultValue, description } = useSchemaSelector(flag);

  const value = useSelector(valueSelector) ?? defaultValue ?? false;
  const checked = invert ? !value : value;

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
      <div className={"flex items-center gap-4 justify-between max-w-[200px]"}>
        <InputLabel
          className={"cursor-pointer"}
          htmlFor={flag}
          onClick={() => onChange(!checked)}
        >
          {label}
        </InputLabel>
        <Switch checked={checked} onChange={(val) => onChange(val)} />
        {/* <HelperText>{description}</HelperText> */}
      </div>
      <HelperText>{description}</HelperText>
    </div>
  );
};
