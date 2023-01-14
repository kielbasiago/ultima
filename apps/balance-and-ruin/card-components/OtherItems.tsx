import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagRange } from "~/components/FlagRange/FlagRange";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

export const OtherItems = () => {
  return (
    <Card title={"Other"}>
      <CardColumn>
        <FlagRange flag="-csb" label="Cursed Shield Battles" />
        <FlagSwitch
          flag="-saw"
          label="Stronger Atma Weapon"
          helperText="Atma Weapon moves to a higher tier and is more effective at lower levels"
        />
      </CardColumn>
    </Card>
  );
};
