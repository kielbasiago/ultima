import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";
import { Divider } from "~/design-components/Divider/Divider";

export const BugFixes = () => {
  return (
    <Card title={"Bug Fixes"}>
      <CardColumn>
        <FlagSwitch flag="-fedc" label="Enemy Damage Counter" />
        <FlagSwitch flag="-fe" label="Evade" />
        <Divider />
        <FlagSwitch flag="-fbs" label="Boss Skip" />
        <FlagSwitch flag="-fvd" label="Vanish/Doom" />
        <Divider />
        <FlagSwitch flag="-fj" label="Jump" />
      </CardColumn>
    </Card>
  );
};
