import { Card } from "@ff6wc/ui";
import { FlagRange } from "~/components/FlagRange/FlagRange";
import {
  FlagSubflagSelect,
  SubflagOption,
} from "~/components/FlagSubflagSelect/FlagSubflagSelect";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

const startingLores: SubflagOption[] = [
  {
    defaultValue: [1, 5],
    flag: "-slr",
    helperText: "",
    label: "Random",
    Renderable: ({ children }) => (
      <FlagRange flag="-slr" helperText="" label={children} />
    ),
  },
];

const mpOptions: SubflagOption[] = [
  {
    defaultValue: true,
    flag: "-lmps",
    label: "Shuffle",
    helperText: "Original MP costs shuffled between lores",
    Renderable: null,
  },
  {
    defaultValue: [0, 99],
    flag: "-lmprv",
    label: "Random Flat Value",
    helperText: "Each lore's MP cost set to random value within given range",
    Renderable: ({ children }) => (
      <FlagRange flag="-lmprv" helperText="" label={children} />
    ),
  },
  {
    defaultValue: [75, 125],
    flag: "-lmprp",
    label: "Random Percent",
    helperText:
      "Each lore's MP cost set to random percent of the original cost within given range",
    Renderable: ({ children }) => (
      <FlagRange flag="-lmprp" helperText="" label={children} type="percent" />
    ),
  },
];
export const Lores = () => {
  return (
    <Card title={"Lores"}>
      <div className="flex flex-col gap-2">
        <FlagSubflagSelect
          label="Starting Lores"
          nullableLabel="Original"
          nullableDescription="Start with Strago's original lores"
          options={startingLores}
        />
        <FlagSubflagSelect
          label="MP"
          nullableLabel="Original"
          nullableDescription="Original MP costs as the vanilla game"
          options={mpOptions}
        />

        <FlagSwitch flag="-lel" label="Everyone Learns" />
      </div>
    </Card>
  );
};
