import { useId } from "react";

import BaseSelect, { components, OptionProps } from "react-select";

export type Option = {
  readonly id: string;
  readonly isDisabled?: boolean;
  readonly label: string;
};

type SelectProps = {
  onChange: (selected: Option | null) => void;
  options: Option[];
  value: Option;
};

const Option = ({ children, data, ...rest }: OptionProps<Option, false>) => {
  return (
    <components.Option data={data} {...rest}>
      <div className="flex flex-col justify-start gap-2">{children}</div>
    </components.Option>
  );
};

const PaletteSelect = ({ options, onChange, value }: SelectProps) => {
  const id = useId();

  return (
    <div className="flex flex-col gap-2">
      <BaseSelect
        className="my-react-select-container min-w-[370px]"
        classNamePrefix="my-react-select"
        components={{ Option }}
        defaultValue={value}
        instanceId={id}
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.id}
        options={options}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default PaletteSelect;
