import { Card } from "@ff6wc/ui";
import { FlagRange } from "~/components/FlagRange/FlagRange";
import {
  FlagSubflagSelect,
  SubflagOption,
} from "~/components/FlagSubflagSelect/FlagSubflagSelect";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

const startingRages: SubflagOption[] = [
  {
    defaultValue: [1, 5],
    flag: "-srr",
    helperText: "Begin the game with {{.}} rages learned",
    label: "Random",
    Renderable: ({ children }) => (
      <FlagRange flag="-srr" helperText="" label={children} />
    ),
  },
];
export const Rages = () => {
  return (
    <Card title={"Rage"}>
      <div className="flex flex-col gap-2">
        <FlagSubflagSelect
          label="Starting Rages"
          nullable={{
            description: "Original",
            label: "Original starting rages",
          }}
          options={startingRages}
        />
        <FlagSwitch flag="-rnl" label="No Leap" />
        <FlagSwitch flag="-rnc" label="No Charm" />
      </div>
    </Card>
  );
};
