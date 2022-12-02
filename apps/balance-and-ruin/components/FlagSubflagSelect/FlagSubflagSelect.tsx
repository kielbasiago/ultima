import { useId } from "react";
import BaseSelect, { components, OptionProps } from "react-select";

export type SubflagOption = {
  id: string;
  label: string;
  render: React.ReactNode;
};

export type FlagSubflagSelectProps = {
  label: string;
  onChange: (selected: SubflagOption | null) => void;
  options: SubflagOption[];
  value: SubflagOption;
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
  onChange,
  options,
  value,
}: FlagSubflagSelectProps) => {
  const id = useId();
  return (
    <BaseSelect
      className="ff6wc-select-container"
      classNamePrefix="ff6wc-select"
      components={{ Option }}
      defaultValue={value}
      instanceId={id}
      getOptionLabel={(option) => option.label}
      getOptionValue={(option) => option.id}
      options={options}
      onChange={onChange}
      value={value}
    />
  );
};
