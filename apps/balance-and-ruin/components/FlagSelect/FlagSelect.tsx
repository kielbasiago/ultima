import { characterNames } from "@ff6wc/ff6-types";
import startCase from "lodash/startCase";
import { useEffect, useId } from "react";
import { useDispatch } from "react-redux";
import BaseSelect, { components, OptionProps } from "react-select";
import { InputLabel } from "~/components/InputLabel/InputLabel";
import { setFlag, useFlagValueSelector } from "~/state/flagSlice";
import { useSchemaSelector } from "~/state/schemaSlice";

export type Option = {
  readonly id: string;
  readonly isDisabled?: boolean;
  readonly label: string;
};

const EMPTY_ID = "none";

const empty = {
  id: EMPTY_ID,
  label: "None",
};

const Option = ({ children, data, ...rest }: OptionProps<Option, false>) => {
  return (
    <components.Option data={data} {...rest}>
      <div className="flex flex-col justify-start gap-2">{children}</div>
    </components.Option>
  );
};

const [random, randomngu]: Option[] = [
  { id: "random", label: "Random" },
  { id: "randomngu", label: "Random (No Gogo/Umaro)" },
];

const options = [
  empty,
  random,
  randomngu,
  ...characterNames.map(
    (id) =>
      ({
        id,
        label: startCase(id),
      } as Option)
  ),
];
type FlagSelectProps = {
  flag: string;
  label?: React.ReactNode;
  options?: Option[];
};

export const FlagSelect = ({ flag, label, options = [] }: FlagSelectProps) => {
  const dispatch = useDispatch();
  const flagValue = useFlagValueSelector<string | null>(flag) ?? empty.id;
  const schema = useSchemaSelector(flag);
  const id = useId();

  const schemaOptions = schema.allowedValues;

  const value = options.find((option) => option.id === flagValue);

  const onChange = (option: Option | null) => {
    if (option?.id === EMPTY_ID) {
      // value of null will remove it from the flags list
      dispatch(
        setFlag({
          flag,
          value: null,
        })
      );
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
      <InputLabel className={"cursor-pointer"} htmlFor={id}>
        {label}
      </InputLabel>

      <BaseSelect
        className="ff6wc-select-container min-w-[370px]"
        classNamePrefix="my-react-select"
        components={{ Option }}
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
