import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

export const Espers = () => {
  return (
    <Card title={"Espers"}>
      <CardColumn>
        <FlagSwitch flag="-ems" label="Multi Summon" />
      </CardColumn>
    </Card>
  );
};
