import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

export const BugFixes = () => {
  return (
    <Card title={"Bug Fixes"}>
      <CardColumn>
        <FlagSwitch flag="-fedc" label="Enemy Damage Counter" />
        <FlagSwitch flag="-fs" label="Sketch" />
        <FlagSwitch flag="-fe" label="Evade" />

        <FlagSwitch flag="-fr" label="Retort" />
        <FlagSwitch flag="-fvd" label="Vanish/Doom" />
        <FlagSwitch flag="-fj" label="Jump" />
        <FlagSwitch flag="-fbs" label="Boss Skip" />
      </CardColumn>
    </Card>
  );
};
