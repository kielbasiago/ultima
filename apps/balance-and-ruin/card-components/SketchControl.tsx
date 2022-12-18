import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

export const SketchControl = () => {
  return (
    <Card title={"Sketch/Control"}>
      <CardColumn>
        <FlagSwitch
          flag="-scis"
          helperText="When enabled, Sketch and Control commands have 100% accuracy, and use the caster's stats instead of the enemy's"
          label="Improved Sketch/Control"
        />
      </CardColumn>
    </Card>
  );
};
