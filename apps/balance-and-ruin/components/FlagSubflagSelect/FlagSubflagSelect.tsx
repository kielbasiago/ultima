import React, { useId, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseSelect from "react-select";
import { FlagLabel } from "~/components/FlagLabel/FlagLabel";
import { FlagSelectOption } from "~/components/FlagSelectOption/FlagSelectOption";
import {
  EMPTY_FLAG_VALUE,
  selectActiveMutuallyExclusiveFlag,
  setFlag,
  useFlagValueSelector,
} from "~/state/flagSlice";
import { FlagValue, selectDescription } from "~/state/schemaSlice";
import { renderDescription } from "~/utils/renderDescription";

export type SubflagOption = {
  defaultValue: FlagValue;
  flag: string;
  helperText: string;
  label: string;
  Renderable?: React.FC<{ children: React.ReactNode }> | null;
};

export type FlagSubflagSelectProps = {
  label: string;
  options: SubflagOption[];
  nullableLabel: string;
  nullableDescription: string;
};

export const FlagSubflagSelect = ({
  label,
  nullableDescription,
  nullableLabel,
  options: baseOptions,
}: FlagSubflagSelectProps) => {
  const dispatch = useDispatch();
  const id = useId();

  const selectedFlag = useSelector(
    selectActiveMutuallyExclusiveFlag(...baseOptions.map(({ flag }) => flag))
  );

  const schemaDescription = useSelector(
    selectedFlag ? selectDescription(selectedFlag) : () => null
  );

  const empty = useMemo<SubflagOption>(
    () => ({
      flag: EMPTY_FLAG_VALUE,
      label: nullableLabel ?? "None",
      defaultValue: null,
      helperText: nullableDescription,
    }),
    [nullableDescription, nullableLabel]
  );

  const options: SubflagOption[] = useMemo(() => {
    const newOptions = [...baseOptions];
    newOptions.unshift(empty);

    return newOptions;
  }, [baseOptions, empty]);

  const onChange = ({ defaultValue, flag }: SubflagOption) => {
    if (selectedFlag && selectedFlag !== EMPTY_FLAG_VALUE) {
      dispatch(
        setFlag({
          flag: selectedFlag,
          value: null,
        })
      );
    }

    if (flag !== EMPTY_FLAG_VALUE) {
      dispatch(
        setFlag({
          flag,
          value: defaultValue,
        })
      );
    }
  };

  const selectedOption = useMemo(
    () => options.find(({ flag }) => flag === selectedFlag) ?? empty,
    [empty, selectedFlag, options]
  );

  const { Renderable } = selectedOption;

  const Select = (
    <BaseSelect
      className="ff6wc-select-container"
      classNamePrefix="ff6wc-select"
      components={{ Option: FlagSelectOption }}
      instanceId={id}
      getOptionLabel={(option) => option.label ?? nullableLabel}
      getOptionValue={(option) => option.flag}
      options={options}
      onChange={(selected) => onChange(selected as SubflagOption)}
      value={selectedOption}
    />
  );

  const selectedValue = useFlagValueSelector<FlagValue>(selectedOption.flag);

  const description = renderDescription(
    selectedOption.helperText ?? schemaDescription ?? "",
    selectedValue
  );

  return (
    <div className="flex flex-col gap-1">
      <>
        <FlagLabel
          flag={selectedOption.flag}
          helperText={description}
          label={label}
        />

        {Renderable ? <Renderable>{Select}</Renderable> : Select}
      </>
    </div>
  );
};
