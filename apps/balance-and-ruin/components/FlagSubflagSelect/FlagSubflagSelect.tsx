import { useId, useMemo } from "react";
import BaseSelect, { components, OptionProps } from "react-select";
import { useFlagValueSelector } from "~/state/flagSlice";
import { FlagValue } from "~/state/schemaSlice";

export type SubflagOption = {
  flag: string;
  label: string;
  helperText?: string;
  render: React.ReactNode;
};

export type FlagSubflagSelectProps = {
  label: string;
  options: SubflagOption[];
  nullableLabel: string;
  nullableDescription: string;
};

const EMPTY_ID = "none";

const empty = {
  id: EMPTY_ID,
  label: "None",
};

const Option = ({
  children,
  data,
  ...rest
}: OptionProps<SubflagOption, false>) => {
  return (
    <components.Option data={data} {...rest}>
      <div className="flex flex-col justify-start gap-2">{children}</div>
    </components.Option>
  );
};

export const FlagSubflagSelect = ({
  label,
  nullableDescription,
  nullableLabel,
}: // options,
FlagSubflagSelectProps) => {
  const id = useId();
  // const dispatch = useDispatch();
  // const flagValue = useFlagValueSelector<string | null>(flag) ?? empty.id;

  // const allowedValues = useSelector(selectAllowedValues(flag)) ?? [];
  // const description = useSelector(selectDescription(flag));
  // const id = useId();

  // const options: FlagSelectOption[] = useMemo(() => {
  //   const newOptions = optionOverrides
  //     ? [...optionOverrides]
  //     : allowedValues.map(
  //         (val) =>
  //           ({
  //             id: val,
  //             label: startCase(val as string),
  //             isDisabled: false,
  //           } as FlagSelectOption)
  //       ) || [];

  //   if (nullable) {
  //     newOptions.unshift({
  //       id: EMPTY_ID,
  //       label: nullableLabel ?? "None",
  //     });
  //   }

  //   return newOptions;
  // }, [allowedValues]);

  const options: any[] = [];
  const onChange = () => {};
  const value: any = empty;
  return (
    <BaseSelect
      className="ff6wc-select-container"
      classNamePrefix="ff6wc-select"
      components={{ Option }}
      instanceId={id}
      getOptionLabel={(option) => option.label}
      getOptionValue={(option) => option.flag}
      options={options}
      onChange={onChange}
      value={value}
    />
  );
};
