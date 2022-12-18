import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

export const AuctionHouse = () => {
  return (
    <Card title={"Auction House"}>
      <CardColumn>
        <FlagSwitch flag="-ari" label="Randomize Items" />
        <FlagSwitch
          flag="-anca"
          invert
          helperText="Allow the unbuyable chocobo and 1/1200 airship to appear in the Auction House. Decreases the chance of seeing espers/items"
          label="Allow Chocobo/Airship"
        />
        <FlagSwitch flag="-adeh" label="Door Hint" />
      </CardColumn>
    </Card>
  );
};
