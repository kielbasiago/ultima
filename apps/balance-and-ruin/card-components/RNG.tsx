import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

export const RNG = () => {
  return (
    <Card title={"RNG"}>
      <CardColumn>
        <FlagSwitch flag="-rr" label="Random RNG" />
        <FlagSwitch flag="-rc" label="Random Zozo Clock" />
      </CardColumn>
    </Card>
  );
};
