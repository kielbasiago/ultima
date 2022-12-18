import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

export const Coliseum = () => {
  return (
    <Card title={"Coliseum"}>
      <CardColumn>
        <FlagSwitch flag="-crm" label="Rewards Menu" />
      </CardColumn>
    </Card>
  );
};
