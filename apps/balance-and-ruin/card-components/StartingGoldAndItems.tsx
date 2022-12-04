import { Card } from "@ff6wc/ui";
import { Column } from "~/components/Column/Column";
import { FlagNumberInput } from "~/components/FlagNumberInput/FlagNumberInput";
import { FlagSlider } from "~/components/FlagSlider/FlagSlider";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

export const StartingGoldAndItems = () => {
  return (
    <Card title={"Starting Gold/Items"}>
      <Column>
        <FlagNumberInput
          description="Start game with entered gold between "
          flag="-gp"
          label="Starting Gold"
          type="int"
        />
        <FlagSlider flag="-smc" label="Starting Moogle Charms" />
        <FlagSlider flag="-sws" label="Starting Warp Stones" />
        <FlagSlider flag="-sfd" label="Starting Fenix Downs" />
        <FlagSlider flag="-sto" label="Starting Tools" />
      </Column>
    </Card>
  );
};
