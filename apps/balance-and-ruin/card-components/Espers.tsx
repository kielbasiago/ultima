import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagRange } from "~/components/FlagRange/FlagRange";
import { FlagSlider } from "~/components/FlagSlider/FlagSlider";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

export const Espers = () => {
  return (
    <Card title={"Espers"}>
      <CardColumn>
        <FlagRange
          flag="-stesp"
          helperText={"Begin the game with {{ . }} espers"}
          label="Starting Espers"
        />
        <FlagSwitch flag="-ems" label="Multi Summon" />
      </CardColumn>
    </Card>
  );
};
