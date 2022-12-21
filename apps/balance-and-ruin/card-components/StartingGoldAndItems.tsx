import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagNumberInput } from "~/components/FlagNumberInput/FlagNumberInput";
import { FlagSlider } from "~/components/FlagSlider/FlagSlider";

export const StartingGoldAndItems = () => {
  return (
    <Card title={"Starting Gold/Items"}>
      <CardColumn>
        <FlagNumberInput
          description="Begin the game with {{ . }} gold"
          flag="-gp"
          label="Starting Gold"
          type="int"
        />
        <FlagSlider
          flag="-smc"
          helperText="Begin the game with {{ . }} Moogle Charms. Overrides the 'No Moogle Charms' option"
          label="Starting Moogle Charms"
        />
        <FlagSlider
          helperText="Begin the game with {{ . }} Warp Stones"
          flag="-sws"
          label="Starting Warp Stones"
        />
        <FlagSlider
          helperText="Begin the game with {{ . }} Fenix Downs"
          flag="-sfd"
          label="Starting Fenix Downs"
        />
      </CardColumn>
    </Card>
  );
};
