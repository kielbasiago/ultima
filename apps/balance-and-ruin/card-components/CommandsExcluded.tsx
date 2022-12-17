import {
  ALL_COMMANDS,
  CommandOption,
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
import { InputLabel } from "~/components/InputLabel/InputLabel";
import { setFlag, useFlagValueSelector } from "~/state/flagSlice";

const hoistedOptions = [RANDOM, RANDOM_UNIQUE, NONE];

const rawOptions = Object.values(ALL_COMMANDS).filter(
  ({ id }) => !hoistedOptions.includes(id)
);

const options: CommandOption[] = [
  NONE_OPTION,
  ...orderBy(rawOptions, ({ label }) => label),
];

type ExcludeSelectProps = {
  flag: string;
};

export const ExcludeSelect = ({ flag }: ExcludeSelectProps) => {
  const dispatch = useDispatch();
  const id = useId();
  const value = useFlagValueSelector<number>(flag);
  const selectedOption = useMemo(
    () => options.find(({ id }) => id === value) ?? NONE_OPTION,
    [value]
  );
  const onChange = (val: CommandOption | null) => {
    dispatch(
      setFlag({
        flag,
        value: val?.id ?? null,
      })
    );
  };

  return (
    <BaseSelect
      className="ff6wc-select-container"
      classNamePrefix="ff6wc-select"
      components={{ Option: FlagSelectOption }}
      instanceId={id}
      getOptionLabel={(option) => option.label}
      getOptionValue={(option) => option.id.toString()}
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
              "The commands below will not be considered when for Random and Random Unique commands"
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
