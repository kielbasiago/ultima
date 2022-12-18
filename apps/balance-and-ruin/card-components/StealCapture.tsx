import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import {
  FlagSubflagSelect,
  SubflagOption,
} from "~/components/FlagSubflagSelect/FlagSubflagSelect";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

const stealOptions: SubflagOption[] = [
  {
    defaultValue: true,
    flag: "-sch",
    label: "Higher",
    helperText: "Steal rate is improved and rare steals are more likely",
    Renderable: null,
  },
  {
    defaultValue: true,
    flag: "-sca",
    label: "Always",
    helperText: "Steal will always succeed if an enemy has an enemy",
    Renderable: null,
  },
];

export const StealCapture = () => {
  return (
    <Card title={"Steal/Capture"}>
      <CardColumn>
        <FlagSubflagSelect
          label="Chance to Steal"
          nullable={{
            label: "Original",
            description: "Original steal changes",
          }}
          options={stealOptions}
        />

        <FlagSwitch
          flag="-fc"
          helperText="When enabled, multi-steal can give more than one item, and weapon specials can now proc using the Capture command"
          label="Fix Capture Bugs"
        />
      </CardColumn>
    </Card>
  );
};
