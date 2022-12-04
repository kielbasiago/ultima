import { Card } from "@ff6wc/ui";
import { Column } from "~/components/Column/Column";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

export const SwdTechs = () => {
  return (
    <Card title={"SwdTech"}>
      <Column>
        <FlagSwitch flag="-fst" label="Fast SwdTech" />
        <FlagSwitch flag="-sel" label="Everyone Learns" />
      </Column>
    </Card>
  );
};
