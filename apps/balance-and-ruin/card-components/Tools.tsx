import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagSlider } from "~/components/FlagSlider/FlagSlider";

export const Tools = () => {
  return (
    <Card title={"Tools"}>
      <CardColumn>
        <FlagSlider
          helperText="Begin the game with {{ . }} different random tools"
          flag="-sto"
          label="Starting Tools"
        />
      </CardColumn>
    </Card>
  );
};
