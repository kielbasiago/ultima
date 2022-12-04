import { components, OptionProps } from "react-select";

export const FlagSelectOption = <T extends object>({
  children,
  data,
  ...rest
}: OptionProps<T, false>) => {
  return (
    <components.Option data={data} {...rest}>
      <span className="text-sm">{children}</span>
    </components.Option>
  );
};
