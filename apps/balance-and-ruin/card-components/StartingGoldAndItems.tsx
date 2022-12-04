import { Card } from "@ff6wc/ui";
import { Column } from "~/components/Column/Column";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";
export const StartingGoldAndItems = () => {
  return (
    <Card title={"SwdTech"}>
      <Column>
        <FlagSwitch flag="-fst" label="Fast SwdTech" />
      </Column>
    </Card>
  );
};
