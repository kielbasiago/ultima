import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagRange } from "~/components/FlagRange/FlagRange";
import {
  FlagSubflagSelect,
  SubflagOption,
} from "~/components/FlagSubflagSelect/FlagSubflagSelect";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

const mpOptions: SubflagOption[] = [
  {
    defaultValue: true,
    flag: "-mmps",
    helperText: "Original MP costs shuffled between spells",
    label: "Shuffle",
    isStatic: true,
  },
  {
    defaultValue: [0, 254],
    flag: "-mmprv",
    helperText: "Each spell has an MP cost between {{ . }}",
    label: "Random Flat Value",
    Renderable: ({ children }) => <FlagRange flag="-mmprv" label={children} />,
  },
  {
    defaultValue: [75, 125],
    flag: "-mmprp",
    helperText:
      "Each spells has an MP cost between {{ . }}% of its original cost",
    label: "Random Percent",
    Renderable: ({ children }) => <FlagRange flag="-mmprp" label={children} />,
  },
];

const rlsOptions: SubflagOption[] = [
  {
    defaultValue: "all",
    flag: "-rls",
    helperText:
      "Spells can no longer be learned from Natural Magic, Espers, Equipment, or Objectives",
    label: "Remove All Spells",
    isStatic: true,
  },
  {
    defaultValue: "black",
    flag: "-rls",
    helperText:
      "Black magic spells can no longer be learned from Natural Magic, Espers, Equipment, or Objectives",
    label: "Remove Black Magic",
    isStatic: true,
  },
  {
    defaultValue: "white",
    flag: "-rls",
    helperText:
      "White magic spells can no longer be learned from Natural Magic, Espers, Equipment, or Objectives",
    label: "Remove White Magic",
    isStatic: true,
  },
  {
    defaultValue: "gray",
    flag: "-rls",
    helperText:
      "Support magic spells can no longer be learned from Natural Magic, Espers, Equipment, or Objectives",
    label: "Remove Support Magic",
    isStatic: true,
  },
];
export const Spells = () => {
  return (
    <Card title={"Spells"}>
      <CardColumn>
        <FlagSubflagSelect
          label="MP"
          nullable={{
            description: "Original MP costs of lore spells",
            label: "Original",
          }}
          options={mpOptions}
        />

        <FlagSubflagSelect
          label="Learnable Spells"
          nullable={{
            description: "No changes are made to learnable spells",
            label: "Allow All",
          }}
          options={rlsOptions}
        />

        <FlagSwitch
          flag="-nu"
          helperText="Ultima can no longer be learned from Natural Magic, Espers, Equipment, or Objectives"
          label="No Ultima"
        />
        <FlagSwitch
          flag="-u254"
          helperText="Ultima costs 254 MP to cast without Economizer"
          label="Ultima 254"
        />
      </CardColumn>
    </Card>
  );
};
