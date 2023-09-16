import { components, OptionProps } from "react-select";
import { BaseFlagSelectOption } from "~/components/FlagSelect/FlagSelect";
import { renderDescription } from "~/utils/renderDescription";

export const FlagSelectOption = <T extends BaseFlagSelectOption>({
  children,
  data,
  ...rest
}: OptionProps<T, false>) => {
  const { helperText, defaultValue } = data;

  let description: React.ReactNode = null;
  if (typeof helperText === "function") {
    // description = helperText(defaultValue ?? null);
  } else {
    description = renderDescription(helperText, defaultValue ?? null);
  }
  return (
    <components.Option data={data} {...rest}>
      <p className="text-base pt-1 px-2">{children}</p>
      <p className="text-xs pb-1 px-2">{description}</p>
    </components.Option>
  );
};
