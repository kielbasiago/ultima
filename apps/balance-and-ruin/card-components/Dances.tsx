import { Card } from "@ff6wc/ui";
import { FlagRange } from "~/components/FlagRange/FlagRange";
import { SubflagOption } from "~/components/FlagSubflagSelect/FlagSubflagSelect";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

const startingDances: SubflagOption[] = [
  {
    defaultValue: [0, 2],
    flag: "-sdr",
    helperText: "",
    label: "Random",
    Renderable: ({ children }) => (
      <FlagRange flag="-srr" helperText="" label={children} />
    ),
  },
];
export const Dances = () => {
  return (
    <Card title={"Dances"}>
      <div className="flex flex-col gap-2">
        <FlagRange
          defaultValue={[0, 0]}
          flag={"-sdr"}
          label="Starting Dances"
        />
        <FlagSwitch flag="-das" label="Shuffle Abilities" />
        <FlagSwitch flag="-dda" label="Display Abilities" />
        <FlagSwitch flag="-dns" label="No Stumble" />
        <FlagSwitch flag="-del" label="Everyone Learns" />
      </div>
    </Card>
  );
};
