import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";
import { Divider } from "@ff6wc/ui/Divider/Divider";

export const SwdTechs = () => {
  return (
    <Card title={"SwdTech"}>
      <CardColumn>
        <FlagSwitch flag="-fst" label="Fast SwdTech" />
        <FlagSwitch flag="-sel" label="Everyone Learns" />

        <Divider />

        <FlagSwitch
          flag="-fr"
          invert
          label="Restore Retort Glitch"
          helperText="Restore glitch where Retort can counter various actions infinitely using the Imp status"
        />
      </CardColumn>
    </Card>
  );
};
