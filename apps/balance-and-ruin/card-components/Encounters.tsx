import { Card, HelperText } from "@ff6wc/ui";
import { FlagSlider } from "~/components/FlagSlider/FlagSlider";
import {
  FlagSubflagSelect,
  SubflagOption,
} from "~/components/FlagSubflagSelect/FlagSubflagSelect";
import {
  escapableEncounterDescription,
  fixedEncounterDescription,
  randomEncounterDescription,
} from "~/constants/randomEncounterConstants";

import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";
import { BetaLabel } from "~/components/BetaLabel/BetaLabel";

const randomEncounterOptions: SubflagOption[] = [
  {
    defaultValue: true,
    flag: "-res",
    helperText: `Random encounters are shuffled. ${randomEncounterDescription}`,
    label: "Shuffle",
    isStatic: true,
  },
  {
    defaultValue: 0,
    flag: "-rer",
    helperText: `Random encounters have a {{.}}% chance to be a random boss. ${randomEncounterDescription}`,
    label: "Random with boss chance",
    Renderable: ({ children }) => (
      <div>
        <div>
          <FlagSlider flag="-rer" helperText="" label={children} />
        </div>
      </div>
    ),
  },
];

const fixedEncounterOptions: SubflagOption[] = [
  {
    defaultValue: 0,
    flag: "-fer",
    helperText: `Fixed encounters have a {{.}}% chance to be a random boss. ${fixedEncounterDescription}`,
    label: "Random with boss chance",
    Renderable: ({ children }) => (
      <FlagSlider flag="-fer" helperText="" label={children} />
    ),
  },
];

const escapableEncounterOptions: SubflagOption[] = [
  {
    defaultValue: 100,
    flag: "-escr",
    helperText: `Encounters have a {{.}}% chance to be escapable${escapableEncounterDescription}`,
    label: "Random",
    Renderable: ({ children }) => (
      <FlagSlider flag="-escr" helperText="" label={children} />
    ),
  },
];

export const Encounters = () => {
  return (
    <Card title={"Encounters"}>
      <FlagSubflagSelect
        label="Random Encounters"
        options={randomEncounterOptions}
        nullable={{
          description: randomEncounterDescription,
          label: "Original",
        }}
      />
      <FlagSubflagSelect
        label="Fixed Encounters"
        options={fixedEncounterOptions}
        nullable={{
          description: fixedEncounterDescription,
          label: "Original",
        }}
      />
      <FlagSubflagSelect
        label="Escapable"
        options={escapableEncounterOptions}
        nullable={{
          description: escapableEncounterDescription,
          label: "Original",
        }}
      />
    </Card>
  );
};
