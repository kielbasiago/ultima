import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

export const ItemRestrictions = () => {
  return (
    <Card title={"Restrictions "}>
      <CardColumn>
        <FlagSwitch flag="-nee" label="No Exp. Eggs" />
        <FlagSwitch flag="-nil" label="No Illuminas" />
        <FlagSwitch flag="-nmc" label="No Moogle Charms" />
        <FlagSwitch flag="-noshoes" label="No Sprint Shoes" />
        <FlagSwitch flag="-nfps" label="No Free Paladin Shields" />
      </CardColumn>
    </Card>
  );
};
