import first from "lodash/first";
import React, { useId, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseSelect, { components, OptionProps } from "react-select";
import { FlagLabel } from "~/components/FlagLabel/FlagLabel";
import { FlagSelectOption } from "~/components/FlagSelectOption/FlagSelectOption";
import { selectActiveMutuallyExclusiveFlag, setFlag } from "~/state/flagSlice";
import { FlagValue, selectDescription } from "~/state/schemaSlice";
import { AppState } from "~/state/store";

export type SubflagOption = {
  defaultValue: FlagValue;
  flag: string;
  label: string;
  helperText?: string;
  Renderable?: React.FC<{ children: React.ReactNode }> | null;
};

export type FlagSubflagSelectProps = {
  label: string;
  options: SubflagOption[];
  nullableLabel: string;
  nullableDescription: string;
};

const EMPTY_FLAG = "-ff6wc-empty-value";

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

  const empty = useMemo<SubflagOption>(
    () => ({
      flag: EMPTY_FLAG,
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
    if (selectedFlag && selectedFlag !== EMPTY_FLAG) {
      dispatch(
        setFlag({
          flag: selectedFlag,
          value: null,
        })
      );
    }

    dispatch(
      setFlag({
        flag,
        value: defaultValue,
      })
    );
  };

  const schemaDescription = useSelector(
    selectedFlag ? selectDescription(selectedFlag) : () => null
  );

  const value = useMemo(
    () => options.find(({ flag }) => flag === selectedFlag) ?? empty,
    [empty, selectedFlag, options]
  );

  const { Renderable } = value;

  const Select = (
    <BaseSelect
      className="ff6wc-select-container"
      classNamePrefix="ff6wc-select"
      components={{ Option: FlagSelectOption }}
      instanceId={id}
      getOptionLabel={(option) => option.label}
      getOptionValue={(option) => option.flag}
      options={options}
      onChange={(selected) => onChange(selected as SubflagOption)}
      value={value}
    />
  );

  return (
    <div className="flex flex-col gap-1">
      <>
        <FlagLabel
          flag={value.flag}
          helperText={value.helperText ?? schemaDescription ?? null}
          label={label}
        />
        {Renderable ? null : Select}

        {Renderable ? <Renderable>{Select}</Renderable> : null}
      </>
    </div>
  );
};
