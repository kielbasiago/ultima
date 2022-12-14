import { Card } from "@ff6wc/ui";
import { Column } from "~/components/Column/Column";
import { FlagNumberInput } from "~/components/FlagNumberInput/FlagNumberInput";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

export const ExperienceMagicPointsGold = () => {
  return (
    <Card title={"Experience, Magic Points, Gold"}>
      <Column>
        <FlagNumberInput
          description=""
          flag="-xpm"
          label="Experience Multiplier"
          type="int"
        />
        <FlagNumberInput
          description=""
          flag="-mpm"
          label="Magic Points Multiplier"
          type="int"
        />
        <FlagNumberInput
          description=""
          flag="-gpm"
          label="Gold Multiplier"
          type="int"
        />
        <FlagSwitch
          description="When enabled, experience will be split evenly amongst surviving party members."
          flag="-nxppd"
          invert
          label="Split Party Exp"
        />
      </Column>
    </Card>
  );
};
