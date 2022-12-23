import startCase from "lodash/startCase";
import { useId, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseSelect, { components, OptionProps } from "react-select";
import { FlagLabel } from "~/components/FlagLabel/FlagLabel";
import { FlagSelectOption } from "~/components/FlagSelectOption/FlagSelectOption";
import { InputLabel } from "~/components/InputLabel/InputLabel";
import { setFlag, useFlagValueSelector } from "~/state/flagSlice";
import { selectAllowedValues, selectDescription } from "~/state/schemaSlice";

export type FlagSelectOption = {
  readonly id: string;
  readonly label: string;
  helperText?: string;
};

const EMPTY_ID = "none";

const empty = {
  id: EMPTY_ID,
  label: "None",
};

type FlagSelectProps = {
  /** key used to interact with redux stores */
  flag: string;
  label?: React.ReactNode;
  /** Prepend an option to use when value is null. */
  nullable?: boolean;
  /** Label of the option when value is null  */
  nullableLabel?: string;
  options?: FlagSelectOption[];
};

export const FlagSelect = ({
  flag,
  label,
  options: optionOverrides,
  nullable,
  nullableLabel,
}: FlagSelectProps) => {
  const dispatch = useDispatch();
  const flagValue = useFlagValueSelector<string | null>(flag) ?? empty.id;

  const allowedValues = useSelector(selectAllowedValues(flag));
  const description = useSelector(selectDescription(flag));
  const id = useId();

  const options: FlagSelectOption[] = useMemo(() => {
    const newOptions = optionOverrides?.length
      ? [...optionOverrides]
      : (allowedValues || []).map(
          (val) =>
            ({
              id: val,
              label: startCase(val as string),
              isDisabled: false,
            } as FlagSelectOption)
        ) || [];

    if (nullable) {
      newOptions.unshift({
        id: EMPTY_ID,
        label: nullableLabel ?? "None",
      });
    }

    return newOptions;
  }, [nullable, nullableLabel, optionOverrides, allowedValues]);

  const value = options.find((option) => option.id === flagValue);

  const onChange = (option: FlagSelectOption | null) => {
    if (option?.id === EMPTY_ID) {
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
        value: option?.id ?? null,
      })
    );
  };

  return (
    <div className="flex flex-col gap-1">
      <FlagLabel flag={flag} helperText={description} label={label} />

      <BaseSelect
        className="ff6wc-select-container"
        classNamePrefix="ff6wc-select"
        components={{ Option: FlagSelectOption }}
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
