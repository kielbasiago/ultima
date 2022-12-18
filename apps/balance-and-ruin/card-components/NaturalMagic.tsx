import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

export const NaturalMagic = () => {
  return (
    <Card title={"NaturalMagic"}>
      <CardColumn>
        <FlagSwitch flag="-rnl1" label="Randomize Levels" />
        <FlagSwitch flag="-rns1" label="Randomize Spells" />
        <FlagSwitch flag="-rnl2" label="Randomize Levels" />
        <FlagSwitch flag="-rns2" label="Randomize Spells" />
      </CardColumn>
    </Card>
  );
};
