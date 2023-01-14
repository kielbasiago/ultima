import {
  ALL_COMMANDS,
  CommandOption,
  FIGHT,
  LEAP,
  NONE,
  NONE_OPTION,
  RANDOM,
  RANDOM_UNIQUE,
} from "@ff6wc/ff6-types";
import { Card } from "@ff6wc/ui";
import orderBy from "lodash/orderBy";
import { useId, useMemo } from "react";
import { useDispatch } from "react-redux";
import BaseSelect from "react-select";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagLabel } from "~/components/FlagLabel/FlagLabel";
import { FlagSelectOption } from "~/components/FlagSelectOption/FlagSelectOption";
import { setFlag, useFlagValueSelector } from "~/state/flagSlice";

const hoistedOptions = [RANDOM, RANDOM_UNIQUE, NONE];
const nonExcludable = [FIGHT, LEAP];

const rawOptions = Object.values(ALL_COMMANDS).filter(
  ({ value }) =>
    !hoistedOptions.includes(value) && !nonExcludable.includes(value)
);

const allOptions: CommandOption[] = [
  NONE_OPTION,
  ...orderBy(rawOptions, ({ label }) => label),
];

type ExcludeSelectProps = {
  flag: string;
};

const useExcludedCommands = () => {
  const rec1 = useFlagValueSelector("-rec1");
  const rec2 = useFlagValueSelector("-rec2");
  const rec3 = useFlagValueSelector("-rec3");
  const rec4 = useFlagValueSelector("-rec4");
  const rec5 = useFlagValueSelector("-rec5");
  const rec6 = useFlagValueSelector("-rec6");
  return useMemo(
    () => [rec1, rec2, rec3, rec4, rec5, rec6].filter((val) => val !== NONE),
    [rec1, rec2, rec3, rec4, rec5, rec6]
  );
};

export const ExcludeSelect = ({ flag }: ExcludeSelectProps) => {
  const excludedValues = useExcludedCommands();
  const dispatch = useDispatch();
  const id = useId();
  const value = useFlagValueSelector<number>(flag);
  const selectedOption = useMemo(
    () => allOptions.find(({ value: id }) => id === value) ?? NONE_OPTION,
    [value]
  );
  const onChange = (val: CommandOption | null) => {
    dispatch(
      setFlag({
        flag,
        value: val?.value ?? null,
      })
    );
  };

  const options = useMemo(
    () => allOptions.filter(({ value: id }) => !excludedValues.includes(id)),
    [excludedValues]
  );

  return (
    <BaseSelect
      className="ff6wc-select-container"
      classNamePrefix="ff6wc-select"
      components={{ Option: FlagSelectOption }}
      instanceId={id}
      getOptionLabel={(option) => option.label}
      getOptionValue={(option: CommandOption) => option.value.toString()}
      options={options}
      onChange={(val) => onChange(val)}
      value={selectedOption}
    />
  );
};
export const CommandsExcluded = () => {
  return (
    <Card title={"Excluded"}>
      <CardColumn>
        <div className="flex flex-col gap-1">
          <FlagLabel
            flag="-rec1"
            helperText={
              "The commands below will not be considered for Random and Random Unique commands"
            }
            label={"Excluded Commands"}
          />
          <ExcludeSelect flag="-rec1" />
        </div>
        <ExcludeSelect flag="-rec2" />
        <ExcludeSelect flag="-rec3" />
        <ExcludeSelect flag="-rec4" />
        <ExcludeSelect flag="-rec5" />
        <ExcludeSelect flag="-rec6" />
      </CardColumn>
    </Card>
  );
};
