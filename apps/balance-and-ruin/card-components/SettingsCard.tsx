import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagTextInput } from "~/components/FlagInput/FlagInput";
import {
  FlagSubflagSelect,
  SubflagOption,
} from "~/components/FlagSubflagSelect/FlagSubflagSelect";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

const OPEN_WORLD = {
  flag: "-open",
  helperText: "Unrestricted event access",
  label: "Open World",
  defaultValue: true,
  isStatic: true,
};

const modeOptions: SubflagOption[] = [
  {
    flag: "-cg",
    helperText: "Events locked until required characters recruited",
    label: "Character Gated",
    defaultValue: true,
    isStatic: true,
  },
  OPEN_WORLD,
];

export const SettingsCard = () => {
  return (
    <Card title={"Settings"}>
      <CardColumn>
        <FlagSubflagSelect
          label="Game Mode"
          options={modeOptions}
          defaultSelected={OPEN_WORLD}
        />

        <FlagTextInput
          flag="-s"
          description="Games generated with the same seed and flags will be identical. When empty, a random seed will be generated"
          label="Seed"
          placeholder="Use Random Seed"
        />

        <FlagSwitch flag="-sl" label="Spoiler Log" />
      </CardColumn>
    </Card>
  );
};
