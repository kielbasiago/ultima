import { cx } from "cva";
import { useId } from "react";

export type SelectOption = {
  readonly value: string;
  readonly label: string;
};

type SelectProps = {
  className?: string;
  onChange: (selected: SelectOption | null) => void;
  options: SelectOption[];
  components?: SelectComponentsConfig<SelectOption, false, any>;
  placeholder?: string;
  value: SelectOption | null;
};

import BaseSelect, {
  components,
  OptionProps,
  SelectComponentsConfig,
} from "react-select";

type FlagSelectOptionData = {
  helperText?: string;
  label: string;
  value: string;
};

export const FlagSelectOption = <T extends FlagSelectOptionData>({
  children,
  data,
  ...rest
}: OptionProps<T, false>) => {
  const { helperText, label, value } = data;
  return (
    <components.Option data={data} {...rest}>
      <p className="text-sm">{children}</p>
      <p className="text-xs">{helperText}</p>
    </components.Option>
  );
};

export const Select = ({
  className,
  components = {},
  options,
  onChange,
  placeholder,
  value,
}: SelectProps) => {
  const id = useId();
  const { Option = FlagSelectOption, ...restComponents } = components;

  return (
    <div className="flex flex-col gap-1">
      <BaseSelect
        className={cx(className, "ff6wc-select-container")}
        classNamePrefix={"ff6wc-select"}
        components={{ Option: Option, ...restComponents }}
        instanceId={id}
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.value}
        options={options}
        onChange={(val) => {
          onChange(val as SelectOption);
        }}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};
