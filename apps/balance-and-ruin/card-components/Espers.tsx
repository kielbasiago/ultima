import { Card } from "@ff6wc/ui";
import { BetaLabel } from "~/components/BetaLabel/BetaLabel";
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
    helperText: "Spells are shuffled between espers",
    label: "Shuffle",
    isStatic: true,
  },
  {
    defaultValue: true,
    flag: "-essrr",
    helperText:
      "Spells are shuffled between espers, but are learned at variable rates",
    label: "Shuffle (Random Rates)",
    isStatic: true,
  },
  {
    defaultValue: true,
    flag: "-esrt",
    helperText:
      "Spells are distributed between espers according to their power level",
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
    helperText: "Original bonuses are shuffled between espers",
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

const mpOptions: SubflagOption[] = [
  {
    defaultValue: true,
    flag: "-emps",
    helperText: "Original MP costs are shuffled between espers",
    label: "Shuffle",
    isStatic: true,
  },
  {
    defaultValue: [1, 128],
    flag: "-emprv",
    helperText: "Each esper has an MP cost of {{ . }}",
    label: "Random Flat Value",
    Renderable: ({ children }) => (
      <FlagRange helperText="" flag="-emprv" label={children} />
    ),
  },
  {
    defaultValue: [75, 125],
    flag: "-emprp",
    helperText: "Each esper has an MP cost of {{ . }}% of its original value",
    label: "Random Percent",
    Renderable: ({ children }) => (
      <FlagRange helperText="" flag="-emprp" label={children} />
    ),
  },
];

const equipableOptions: SubflagOption[] = [
  {
    defaultValue: [1, 12],
    flag: "-eer",
    helperText: "Each esper is equipable by {{ . }} random characters",
    label: "Random",
    Renderable: ({ children }) => (
      <FlagRange helperText="" flag="-eer" label={children} />
    ),
  },
  {
    defaultValue: 6,
    flag: "-eebr",
    helperText:
      "Each esper equipable by {{ . }} random characters. The total number of espers equipable by each character is balanced",
    label: "Balanced Random",
    Renderable: ({ children }) => (
      <FlagSlider helperText="" flag="-eebr" label={children} />
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
        <FlagSubflagSelect
          options={mpOptions}
          label="MP"
          nullable={{
            description: "Esper MP costs are unchanged",
            label: "Original",
          }}
        />
        <FlagSubflagSelect
          options={equipableOptions}
          label="Equipable"
          nullable={{
            description: "Espers can be equipped by all characters",
            label: "Original",
          }}
        />
        <FlagRange
          flag="-stesp"
          helperText={"Begin the game with {{ . }} espers"}
          label="Starting Espers"
        />
        <FlagSwitch flag="-ems" label="Multi Summon" />
        <FlagSwitch flag="-emi" label="Esper Mastery Icon" />
      </CardColumn>
    </Card>
  );
};
