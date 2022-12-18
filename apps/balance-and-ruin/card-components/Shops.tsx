import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

export const Shops = () => {
  return (
    <Card title={"Shops"}>
      <CardColumn>
        <FlagSwitch flag="-npi" label="No Priceless Items" />
        <FlagSwitch flag="-snbr" label="No Breakable Rods" />
        <FlagSwitch flag="-snes" label="No Elemental Shields" />
        <FlagSwitch flag="-snsb" label="No Super Balls" />
        <FlagSwitch flag="-snee" label="No Exp. Eggs" />
        <FlagSwitch flag="-snil" label="No Illuminas" />
      </CardColumn>
    </Card>
  );
};
