import { useId } from "react";

import BaseSelect from "react-select";

export type SpriteSelectOption = {
  readonly value: string;
  readonly label: string;
};

type SpriteSelectProps = {
  onChange: (selected: SpriteSelectOption | null) => void;
  options: SpriteSelectOption[];
  value: SpriteSelectOption;
};

import { components, OptionProps } from "react-select";

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

export const Select = ({ options, onChange, value }: SpriteSelectProps) => {
  const id = useId();

  return (
    <div className="flex flex-col gap-1">
      <BaseSelect
        className="ff6wc-select-container"
        classNamePrefix="ff6wc-select"
        components={{ Option: FlagSelectOption }}
        instanceId={id}
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.value}
        options={options}
        onChange={(val) => {
          onChange(val as SpriteSelectOption);
        }}
        value={value}
      />
    </div>
  );
};
