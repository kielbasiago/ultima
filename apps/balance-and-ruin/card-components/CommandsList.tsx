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
  FIGHT,
  MORPH,
  LEAP,
} from "@ff6wc/ff6-types";
import { Button, Card } from "@ff6wc/ui";
import orderBy from "lodash/orderBy";
import padStart from "lodash/padStart";
import sample from "lodash/sample";
import uniq from "lodash/uniq";
import { useDispatch } from "react-redux";
import BaseSelect from "react-select";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagSelectOption } from "~/components/FlagSelectOption/FlagSelectOption";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";
import { InputLabel } from "~/components/InputLabel/InputLabel";
import { setFlag, useFlagValueSelector } from "~/state/flagSlice";

const valToStr = (val: number) => padStart(val.toString(), 2, "0");
const strToVals = (val: string) => val.match(/.{1,2}/g) as string[];

const alwaysExclude = [LEAP, MORPH];
const uniqueOptionIds = [MORPH];
const characterSpecificOptions: Record<number, number[]> = {
  /** Force leap only into the 12th spot */
  12: [LEAP],
};

const originalCommandFlags = DEFAULT_COMMANDS.map(valToStr).join("");

const LABELS = [
  "Terra (Morph)",
  "Locke (Steal)",
  "Cyan (SwdTech)",
  "Shadow (Throw)",
  "Edgar (Tools)",
  "Sabin ( Blitz)",
  "Celes (Runic)",
  "Strago (Lore)",
  "Relm (Sketch)",
  "Setzer (Slot)",
  "Mog (Dance)",
  "Gau (Rage)",
  "Gau (Leap)",
];

const hoistedOptions = [RANDOM, RANDOM_UNIQUE, NONE];
const commandOptions = Object.values(ALL_COMMANDS).filter(
  ({ id }) => !hoistedOptions.includes(id)
);

const constructOptions = (options: CommandOption[]): CommandOption[] => {
  return [
    RANDOM_OPTION,
    RANDOM_UNIQUE_OPTION,
    NONE_OPTION,
    ...orderBy(options, ({ label }) => label),
  ];
};

const isSpecificToCharacter = (commandId: number, commandIndex: number) => {
  const charSpecificCommands = characterSpecificOptions[commandIndex];
  return charSpecificCommands?.includes(commandId);
};

const getOptionsForCharacter = (
  options: CommandOption[],
  selectedCommands: number[],
  commandIndex: number
) => {
  const characterCommands = options.filter(({ id }) =>
    isSpecificToCharacter(id, commandIndex)
  );

  const uniqueCommands = options.filter(({ id }) =>
    uniqueOptionIds.includes(id)
      ? !selectedCommands.includes(id) || selectedCommands[commandIndex] === id
      : false
  );

  const characterCommandIds = characterCommands.map(({ id }) => id);
  const uniqueCommandIds = characterCommands.map(({ id }) => id);
  const excludes = uniq(characterCommandIds.concat(uniqueCommandIds));

  const standardOptions = options
    .filter(({ id }) => !excludes.includes(id) && !alwaysExclude.includes(id))
    .concat();

  return standardOptions.concat(uniqueCommands).concat(characterCommands);
};

export const CommandsList = () => {
  const dispatch = useDispatch();
  const commandValue =
    useFlagValueSelector<string>("-com") ?? originalCommandFlags;

  const rawValues = strToVals(commandValue) ?? [];

  const values = rawValues.map((val) => ALL_COMMANDS[Number.parseInt(val)]);
  const valueIds = values.map(({ id }) => id);
  const setCommands = (value: string) => {
    dispatch(
      setFlag({
        flag: "-com",
        value,
      })
    );
  };

  const onChange = (val: CommandOption | null, idx: number) => {
    const ids = values.map(({ id }) => valToStr(id));
    ids[idx] = valToStr(val?.id ?? NONE);
    const newValue = ids.join("");
    setCommands(newValue);
  };

  const allOriginal = () => {
    setCommands(originalCommandFlags);
  };

  const allRandomized = () => {
    const excludedRandomized = [FIGHT, LEAP];
    const validOptions = commandOptions.filter(
      ({ id }) => !excludedRandomized.includes(id)
    );
    const randomized = DEFAULT_COMMANDS.map(
      () => sample(validOptions) as CommandOption
    )
      .map(({ id }) => valToStr(id))
      .join("");
    setCommands(randomized);
  };

  const allRandom = () => {
    const random = valToStr(RANDOM);
    setCommands(DEFAULT_COMMANDS.map(() => random).join(""));
  };

  const allRandomUnique = () => {
    const randomUnique = valToStr(RANDOM_UNIQUE);
    setCommands(DEFAULT_COMMANDS.map(() => randomUnique).join(""));
  };

  return (
    <Card contentClassName="gap-2" title={"Commands"}>
      <div className="flex gap-3 justify-center flex-wrap">
        <Button className="hidden" onClick={allRandomized} variant="primary">
          Randomize
        </Button>
        <Button onClick={allRandom} variant="primary">
          All Random
        </Button>
        <Button onClick={allRandomUnique} variant="primary">
          All Random Unique
        </Button>
        <Button onClick={allOriginal} variant="primary">
          Original
        </Button>
      </div>
      <CardColumn>
        {LABELS.map((label, idx) => {
          const id = `${label}-select`;
          const unsortedOptions = getOptionsForCharacter(
            commandOptions,
            valueIds,
            idx
          );
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
                options={constructOptions(unsortedOptions)}
                onChange={(val) => onChange(val, idx)}
                value={values[idx]}
              />
            </div>
          );
        })}
        <FlagSwitch
          flag="-scc"
          label="Shuffle Commands"
          helperText="Shuffle the commands selected above"
        />
      </CardColumn>
    </Card>
  );
};
