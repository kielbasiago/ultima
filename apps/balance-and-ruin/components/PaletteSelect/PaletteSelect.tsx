import { useId } from "react";

import BaseSelect, { components, OptionProps } from "react-select";
import { FlagSelectOption } from "~/components/FlagSelectOption/FlagSelectOption";
import { PaletteSwatch } from "~/components/PaletteSwatch/PaletteSwatch";

export type PaletteSelectOption = {
  readonly value: string;
  readonly label: string;
  readonly color?: number[][];
  readonly isDisabled?: boolean;
};

type SelectProps = {
  onChange: (selected: PaletteSelectOption | null) => void;
  options: PaletteSelectOption[];
  value: PaletteSelectOption;
};

const PaletteOption = ({
  children,
  data,
  ...rest
}: OptionProps<PaletteSelectOption, false>) => {
  return (
    <components.Option data={data} {...rest}>
      <div className="flex flex-col justify-center gap-2">
        {children}
        <div>
          <PaletteSwatch colors={data.color as number[][]} />
        </div>
      </div>
    </components.Option>
  );
};

const PaletteSelect = ({ options, onChange, value }: SelectProps) => {
  const id = useId();

  return (
    <div className="flex flex-col gap-1 flex-grow">
      <BaseSelect
        className="ff6wc-select-container"
        classNamePrefix="ff6wc-select"
        components={{ Option: PaletteOption }}
        instanceId={id}
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.value}
        options={options}
        onChange={(val) => {
          onChange(val as PaletteSelectOption);
        }}
        value={value}
      />
    </div>
  );
};

export default PaletteSelect;
