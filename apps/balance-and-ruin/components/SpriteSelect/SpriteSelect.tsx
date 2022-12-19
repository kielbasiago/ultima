import { useId } from "react";

import BaseSelect, { components, OptionProps } from "react-select";
import { FlagSelectOption } from "~/components/FlagSelectOption/FlagSelectOption";

export type SpriteSelectOption = {
  readonly value: string;
  readonly label: string;
};

type SpriteSelectProps = {
  onChange: (selected: SpriteSelectOption | null) => void;
  options: SpriteSelectOption[];
  value: SpriteSelectOption;
};

const SpriteSelect = ({ options, onChange, value }: SpriteSelectProps) => {
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

export default SpriteSelect;
