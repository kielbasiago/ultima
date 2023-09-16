import { HelperText } from "@ff6wc/ui";
import startCase from "lodash/startCase";
import { useId, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlagLabel } from "~/components/FlagLabel/FlagLabel";
import { FlagSelectOption } from "~/components/FlagSelectOption/FlagSelectOption";
import { Select, SelectOption } from "~/components/Select/Select";
import { setFlag, useFlagValueSelector } from "~/state/flagSlice";
import {
  FlagValue,
  selectAllowedValues,
  selectDescription,
} from "~/state/schemaSlice";
import { renderDescription } from "~/utils/renderDescription";

export type BaseFlagSelectOption = {
  label: string;
  helperText?: React.ReactNode;
  defaultValue?: FlagValue;
};

export type FlagSelectOption = BaseFlagSelectOption & SelectOption;

const EMPTY_ID = "empty";

type FlagSelectProps = {
  defaultValue?: FlagSelectOption;
  /** key used to interact with redux stores */
  flag: string;
  label?: React.ReactNode;
  /** Prepend an option to use when value is null. */
  nullable?: boolean;
  /** Label of the option when value is null  */
  nullableLabel?: string;
  nullableHelperText?: string;
  options?: FlagSelectOption[];
};

export const FlagSelect = ({
  defaultValue,
  flag,
  label,
  options: optionOverrides,
  nullable,
  nullableLabel,
}: FlagSelectProps) => {
  const dispatch = useDispatch();
  const flagValue =
    useFlagValueSelector<string | null>(flag) ?? (nullable ? EMPTY_ID : null);

  const allowedValues = useSelector(selectAllowedValues(flag));
  const description = useSelector(selectDescription(flag));
  const id = useId();

  const options: FlagSelectOption[] = useMemo(() => {
    const newOptions = optionOverrides?.length
      ? [...optionOverrides]
      : (allowedValues || []).map(
          (val) =>
            ({
              value: val,
              label: startCase(val as string),
              isDisabled: false,
            } as FlagSelectOption)
        ) || [];

    if (nullable) {
      newOptions.unshift({
        value: EMPTY_ID,
        label: nullableLabel ?? "None",
      });
    }

    return newOptions;
  }, [nullable, nullableLabel, optionOverrides, allowedValues]);

  const value = options.find((option) => option.value === flagValue);

  const onChange = (option: FlagSelectOption | null) => {
    if (option?.value === EMPTY_ID) {
      // value of null will remove it from the flags list
      dispatch(
        setFlag({
          flag,
          value: null,
        })
      );
      return;
    }

    dispatch(
      setFlag({
        flag,
        value: option?.value ?? null,
      })
    );
  };

  const selectedOption = value ?? defaultValue;
  let valueDescription: React.ReactNode;
  if (typeof selectedOption?.helperText === "function") {
    // valueDescription = selectedOption.helperText(selectedOption.value);
  } else {
    valueDescription = renderDescription(
      selectedOption?.helperText,
      selectedOption?.value ?? null
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <FlagLabel flag={flag} helperText={description} label={label} />

      <Select
        components={{ Option: FlagSelectOption }}
        options={options}
        onChange={onChange}
        value={value ?? (defaultValue as FlagSelectOption)}
      />

      <HelperText>{valueDescription}</HelperText>
    </div>
  );
};
