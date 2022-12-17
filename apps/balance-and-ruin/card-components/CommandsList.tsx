import {
  DEFAULT_COMMANDS,
  NONE,
  CommandOption,
  RANDOM_OPTION,
  RANDOM_UNIQUE_OPTION,
  NONE_OPTION,
  ALL_COMMANDS,
  RANDOM_UNIQUE,
  RANDOM,
} from "@ff6wc/ff6-types";
import { Card } from "@ff6wc/ui";
import orderBy from "lodash/orderBy";
import padStart from "lodash/padStart";
import { useDispatch } from "react-redux";
import BaseSelect from "react-select";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagSelectOption } from "~/components/FlagSelectOption/FlagSelectOption";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";
import { InputLabel } from "~/components/InputLabel/InputLabel";
import { setFlag, useFlagValueSelector } from "~/state/flagSlice";

const valToStr = (val: number) => padStart(val.toString(), 2, "0");
const strToVals = (val: string) => val.match(/.{1,2}/g) as string[];

const originalCommandFlags = DEFAULT_COMMANDS.map(valToStr).join("");

const LABELS = [
  "Morph",
  "Steal",
  "SwdTech",
  "Throw",
  "Tools",
  "Blitz",
  "Runic",
  "Lore",
  "Sketch",
  "Slot",
  "Dance",
  "Rage",
  "Leap",
];

const hoistedOptions = [RANDOM, RANDOM_UNIQUE, NONE];
const rawOptions = Object.values(ALL_COMMANDS).filter(
  ({ id }) => !hoistedOptions.includes(id)
);

const options: CommandOption[] = [
  RANDOM_OPTION,
  RANDOM_UNIQUE_OPTION,
  NONE_OPTION,
  ...orderBy(rawOptions, ({ label }) => label),
];

export const CommandsList = () => {
  const dispatch = useDispatch();
  const commandValue =
    useFlagValueSelector<string>("-com") ?? originalCommandFlags;

  const rawValues = strToVals(commandValue) ?? [];

  const values = rawValues.map((val) => ALL_COMMANDS[Number.parseInt(val)]);

  const onChange = (val: CommandOption | null, idx: number) => {
    const ids = values.map(({ id }) => valToStr(id));
    ids[idx] = valToStr(val?.id ?? NONE);
    const newValue = ids.join("");
    dispatch(
      setFlag({
        flag: "-com",
        value: newValue,
      })
    );
  };

  return (
    <Card title={"Commands"}>
      <CardColumn>
        {LABELS.map((label, idx) => {
          const id = `${label}-select`;
          return (
            <div key={id}>
              <InputLabel htmlFor={id}>{label}</InputLabel>
              <BaseSelect
                className="ff6wc-select-container"
                classNamePrefix="ff6wc-select"
                components={{ Option: FlagSelectOption }}
                instanceId={id}
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.id.toString()}
                options={options}
                onChange={(val) => onChange(val, idx)}
                value={values[idx]}
              />
            </div>
          );
        })}
        <FlagSwitch
          flag="-scc"
          label="Shuffle Commands"
          description="Shuffle the commands selected above"
        />
      </CardColumn>
    </Card>
  );
};
