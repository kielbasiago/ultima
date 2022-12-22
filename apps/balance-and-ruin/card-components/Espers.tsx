import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagRange } from "~/components/FlagRange/FlagRange";
import { FlagSlider } from "~/components/FlagSlider/FlagSlider";
import {
  FlagSubflagSelect,
  SubflagOption,
} from "~/components/FlagSubflagSelect/FlagSubflagSelect";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

const spellOptions: SubflagOption[] = [
  {
    defaultValue: true,
    flag: "-esrr",
    helperText:
      "Spells taught are unchanged, but are learned at variable rates",
    label: "Original (Random Rates)",
    isStatic: true,
  },
  {
    defaultValue: true,
    flag: "-ess",
    helperText: "Spells are shuffled among espers",
    label: "Shuffle",
    isStatic: true,
  },
  {
    defaultValue: true,
    flag: "-essrr",
    helperText:
      "Spells are shuffled among espers, but are learned at variable rates",
    label: "Original (Random Rates)",
    isStatic: true,
  },
  {
    defaultValue: true,
    flag: "-esrt",
    helperText:
      "Spells are distributed among espers according to their power level",
    label: "Random Tiered",
    isStatic: true,
  },
  {
    defaultValue: [1, 4],
    flag: "-esr",
    helperText: "Each esper teaches {{ . }} spells",
    label: "Random",
    Renderable: ({ children }) => (
      <FlagRange helperText="" flag="-esr" label={children} />
    ),
  },
];

const bonusOptions: SubflagOption[] = [
  {
    defaultValue: true,
    flag: "-ebs",
    helperText: "Original bonuses are shuffled among espers",
    label: "Shuffle",
    isStatic: true,
  },
  {
    defaultValue: 70,
    flag: "-ebr",
    helperText:
      "Each esper has a {{ . }}% chance to have a bonus. The bonus chosen is random.",
    label: "Random",
    Renderable: ({ children }) => (
      <FlagSlider helperText="" flag="-ebr" label={children} />
    ),
  },
];

export const Espers = () => {
  return (
    <Card title={"Espers"}>
      <CardColumn>
        <FlagSubflagSelect
          options={spellOptions}
          label="Spells"
          nullable={{
            description: "Esper spells are unchanged",
            label: "Original",
          }}
        />
        <FlagSubflagSelect
          options={bonusOptions}
          label="Bonuses"
          nullable={{
            description: "Esper bonuses are unchanged",
            label: "Original",
          }}
        />
        <FlagRange
          flag="-stesp"
          helperText={"Begin the game with {{ . }} espers"}
          label="Starting Espers"
        />
        <FlagSwitch flag="-ems" label="Multi Summon" />
      </CardColumn>
    </Card>
  );
};
