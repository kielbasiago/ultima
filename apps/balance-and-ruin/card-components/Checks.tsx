import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

export const Checks = () => {
  return (
    <Card title={"Checks"}>
      <CardColumn>
        <FlagSwitch flag="-nfce" label="No Free Characters/Espers" />
      </CardColumn>
    </Card>
  );
};
