import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import {
  FlagSubflagSelect,
  SubflagOption,
} from "~/components/FlagSubflagSelect/FlagSubflagSelect";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

const timerOptions: SubflagOption[] = [
  {
    flag: "-etr",
    defaultValue: true,
    label: "Random",
    helperText:
      "Collapsing House, Opera House, and Floating Continent timers are randomized",
    isStatic: true,
  },
  {
    flag: "-etn",
    defaultValue: true,
    label: "None",
    helperText:
      "Collapsing House, Opera House, and Floating Continent timers are removed",
    isStatic: true,
  },
];
const yNpcOptions: SubflagOption[] = [
  {
    flag: "-ymascot",
    defaultValue: true,
    label: "Mascot",
    helperText: "",
    isStatic: true,
  },
  {
    flag: "-ycreature",
    defaultValue: true,
    label: "Creature",
    helperText: "",
    isStatic: true,
  },
  {
    flag: "-yimperial",
    defaultValue: true,
    label: "Imperial",
    helperText: "",
    isStatic: true,
  },
  {
    flag: "-ymain",
    defaultValue: true,
    label: "Main Character",
    helperText: "",
    isStatic: true,
  },
  {
    flag: "-yreflect",
    defaultValue: true,
    label: "Reflect",
    helperText: "",
    isStatic: true,
  },
  {
    flag: "-ystone",
    defaultValue: true,
    label: "Stone",
    helperText: "",
    isStatic: true,
  },
  {
    flag: "-yvxc",
    defaultValue: true,
    label: "Vanish/X-Zone",
    helperText: "",
    isStatic: true,
  },
  {
    flag: "-ysketch",
    defaultValue: true,
    label: "Sketch",
    helperText: "",
    isStatic: true,
  },
  {
    flag: "-yrandom",
    defaultValue: true,
    label: "Random",
    helperText: "",
    isStatic: true,
  },
  {
    flag: "-yremove",
    defaultValue: true,
    label: "Remove",
    helperText: "",
    isStatic: true,
  },
];

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

export const MiscCard = () => {
  return (
    <Card title={"Misc."}>
      <CardColumn>
        <FlagSubflagSelect
          label="Game Mode"
          options={modeOptions}
          defaultSelected={OPEN_WORLD}
        />
        <FlagSwitch flag="-sl" label="Spoiler Log" />
        <FlagSwitch flag="-ond" label="Original Name Display" />

        <FlagSubflagSelect
          nullable={{ description: "", label: "None" }}
          label="Y NPC"
          options={yNpcOptions}
        />
        <FlagSubflagSelect
          label="Event Timers"
          options={timerOptions}
          nullable={{
            description:
              "Collapsing House, Opera House, and Floating Continent timers unmodified",
            label: "Original",
          }}
        />
      </CardColumn>
    </Card>
  );
};
