import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";
import { Divider } from "~/design-components/Divider/Divider";

export const SwdTechs = () => {
  return (
    <Card title={"SwdTech"}>
      <CardColumn>
        <FlagSwitch flag="-fst" label="Fast SwdTech" />
        <FlagSwitch flag="-sel" label="Everyone Learns" />

        <Divider />

        <FlagSwitch flag="-fr" invert label="Enable Retort Glitch" />
      </CardColumn>
    </Card>
  );
};
