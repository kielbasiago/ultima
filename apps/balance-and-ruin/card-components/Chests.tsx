import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagSlider } from "~/components/FlagSlider/FlagSlider";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

export const Chests = () => {
  return (
    <Card title={"Chests"}>
      <CardColumn>
        <FlagSlider
          helperText="{{ . }} shops will contain Dried Meat"
          flag="-sdm"
          label="Dried Meat"
        />
        <FlagSwitch flag="-cms" label="MIAB Shuffled" />
      </CardColumn>
    </Card>
  );
};
