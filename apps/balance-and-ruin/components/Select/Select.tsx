import { cx } from "cva";
import first from "lodash/first";
import last from "lodash/last";
import { KeyboardEvent, useCallback, useId, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";

export type SelectOption = {
  readonly helperText?: string;
  readonly value: string;
  readonly label: string;
};

type SelectProps = {
  className?: string;
  containerClassName: string;
  components?: SelectComponentsConfig<SelectOption, false, any>;
  defaultValue?: SelectOption;
  /** When true, pressing arrow key up/down on a closed select option will select the next option. */
  nextOnArrowKeys?: boolean;
  onChange: (selected: SelectOption | null) => void;
  options: SelectOption[];
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

const ARROW_DOWN = "ArrowDown";
const ARROW_UP = "ArrowUp";
const triggerableKeys = [ARROW_DOWN, ARROW_UP];
export const Select = ({
  className,
  containerClassName,
  components = {},
  defaultValue,
  options,
  onChange,
  placeholder,
  nextOnArrowKeys,
  value,
}: SelectProps) => {
  const id = useId();
  const { Option = FlagSelectOption, ...restComponents } = components;
  const ref = useRef<any>();

  const _selectNextItem = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const idx = options.indexOf(value as SelectOption);

      if (options.length && idx === -1) {
        console.warn("item not found in options");
        return;
      } else if (e.key === ARROW_DOWN) {
        const nextIdx = idx + 1;
        onChange(options[nextIdx] ?? last(options));
        e.preventDefault();
      } else if (e.key === ARROW_UP) {
        const nextIdx = idx - 1;
        onChange(options[nextIdx] ?? first(options));
        e.preventDefault();
      }
    },
    [onChange, options, value]
  );

  const selectNextItem = useDebouncedCallback(_selectNextItem, 0);

  return (
    <div className={cx("flex flex-col gap-1", containerClassName)}>
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
        ref={ref}
        value={value ?? defaultValue}
        onKeyDown={(e) => {
          if (
            nextOnArrowKeys &&
            !ref.current.props.menuIsOpen &&
            !e.ctrlKey &&
            triggerableKeys.includes(e.key)
          ) {
            e.preventDefault();
            selectNextItem(e);
          }
        }}
      />
    </div>
  );
};
