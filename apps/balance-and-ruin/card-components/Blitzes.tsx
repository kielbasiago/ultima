import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

export const Blitzes = () => {
  return (
    <Card title={"Blitzes"}>
      <CardColumn>
        <FlagSwitch flag="-brl" label="Bum Rush Last" />
        <FlagSwitch flag="-bel" label="Everyone Learns" />
      </CardColumn>
    </Card>
  );
};
