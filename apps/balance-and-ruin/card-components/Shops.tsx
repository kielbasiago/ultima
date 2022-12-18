import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";
import { Divider } from "~/design-components/Divider/Divider";

export const Shops = () => {
  return (
    <Card title={"Shops"}>
      <CardColumn>
        <FlagSwitch flag="-snbr" label="No Breakable Rods" />
        <FlagSwitch
          flag="-sebr"
          helperText="Increases the base price of Poison, Fire, Ice, Thunder, Gravity, and Pearl Rods"
          label="Expensive Breakable Rods"
        />
        <Divider />
        <FlagSwitch flag="-snsb" label="No Super Balls" />
        <FlagSwitch
          flag="-sesb"
          helperText="Increases the base price of Super Balls"
          label="Expensive Super Balls"
        />
        <Divider />
        <FlagSwitch flag="-npi" label="No Priceless Items" />
        <FlagSwitch flag="-snes" label="No Elemental Shields" />
        <FlagSwitch flag="-snee" label="No Exp. Eggs" />
        <FlagSwitch flag="-snil" label="No Illuminas" />
      </CardColumn>
    </Card>
  );
};
