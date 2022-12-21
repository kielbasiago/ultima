import { Card, HelperText } from "@ff6wc/ui";
import { FlagSlider } from "~/components/FlagSlider/FlagSlider";
import {
  FlagSubflagSelect,
  SubflagOption,
} from "~/components/FlagSubflagSelect/FlagSubflagSelect";

const fixedEncounterDescription =
  "Applies to unavoidable encounters at fixed locations";
const randomEncounterDescription =
  "Applies to random encounters except Zone Eater";

const escapableEncounterDescription =
  "Applies to random and fixed encounters including with warp or smoke";

const randomEncounterOptions: SubflagOption[] = [
  {
    defaultValue: true,
    flag: "-res",
    helperText: randomEncounterDescription,
    label: "Shuffle",
    isStatic: true,
  },
  {
    defaultValue: 0,
    flag: "-rer",
    helperText: randomEncounterDescription,
    label: "Random",
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
    helperText: fixedEncounterDescription,
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
    helperText: escapableEncounterDescription,
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
