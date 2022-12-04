import { Card } from "@ff6wc/ui";
import { Column } from "~/components/Column/Column";
import {
  FlagSubflagSelect,
  SubflagOption,
} from "~/components/FlagSubflagSelect/FlagSubflagSelect";

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

export const Steal = () => {
  return (
    <Card title={"Steal"}>
      <Column>
        <FlagSubflagSelect
          label="Chance to Steal"
          nullableLabel="Original"
          nullableDescription="Original steal chances"
          options={stealOptions}
        />
      </Column>
    </Card>
  );
};
