import { Card } from "@ff6wc/ui";
import { Column } from "~/components/Column/Column";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

export const Blitzes = () => {
  return (
    <Card title={"Blitzes"}>
      <Column>
        <FlagSwitch flag="-brl" label="Bum Rush Last" />
        <FlagSwitch flag="-bel" label="Everyone Learns" />
      </Column>
    </Card>
  );
};
