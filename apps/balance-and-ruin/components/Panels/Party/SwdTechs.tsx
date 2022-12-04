import { Card } from "@ff6wc/ui";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

export const SwdTechs = () => {
  return (
    <Card title={"SwdTech"}>
      <div className="flex flex-col">
        <FlagSwitch flag="-fst" label="Fast SwdTech" />
        <FlagSwitch flag="-sel" label="Everyrone Learns" />
      </div>
    </Card>
  );
};
