import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

export const Challenges = () => {
  return (
    <Card title={"Challenges"}>
      <CardColumn>
        <FlagSwitch flag="-nmc" label="No Moogle Charms" />
        <FlagSwitch flag="-nee" label="No Exp. Eggs" />
        <FlagSwitch flag="-nil" label="No Illuminas" />
        <FlagSwitch flag="-nfps" label="No Free Paladin Shields" />
        <FlagSwitch flag="-pd" label="Permadeath" />
      </CardColumn>
    </Card>
  );
};
