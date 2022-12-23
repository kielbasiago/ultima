import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

export const OtherItems = () => {
  return (
    <Card title={"Other"}>
      <CardColumn>
        <FlagSwitch
          flag="-saw"
          label="Stronger Atma Weapon"
          helperText="Atma Weapon moves to a higher tier and is more effective at lower levels"
        />
      </CardColumn>
    </Card>
  );
};
