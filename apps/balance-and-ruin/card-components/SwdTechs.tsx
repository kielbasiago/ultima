import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

export const SwdTechs = () => {
  return (
    <Card title={"SwdTech"}>
      <CardColumn>
        <FlagSwitch flag="-fst" label="Fast SwdTech" />
        <FlagSwitch flag="-sel" label="Everyone Learns" />
      </CardColumn>
    </Card>
  );
};
