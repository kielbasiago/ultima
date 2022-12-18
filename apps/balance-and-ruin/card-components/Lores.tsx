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
    helperText: "Begin the game with {{ . }} lore spells learned",
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
    helperText: "Each lore has an MP cost between {{ . }}",
    Renderable: ({ children }) => (
      <FlagRange flag="-lmprv" helperText="" label={children} />
    ),
  },
  {
    defaultValue: [75, 125],
    flag: "-lmprp",
    label: "Random Percent",
    helperText:
      "Each lore has an MP cost between {{ . }}% of its original cost",
    Renderable: ({ children }) => (
      <FlagRange flag="-lmprp" helperText="" label={children} type="percent" />
    ),
  },
];
export const Lores = () => {
  return (
    <Card title={"Lore"}>
      <div className="flex flex-col gap-2">
        <FlagSubflagSelect
          label="Starting Lores"
          nullable={{
            description: "Start with Strago's original lores",
            label: "Original",
          }}
          options={startingLores}
        />
        <FlagSubflagSelect
          label="MP"
          nullable={{
            description: "Original",
            label: "Original MP costs of lore spells",
          }}
          options={mpOptions}
        />

        <FlagSwitch flag="-lel" label="Everyone Learns" />
      </div>
    </Card>
  );
};
