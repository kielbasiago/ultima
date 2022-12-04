import { Card } from "@ff6wc/ui";
import { Column } from "~/components/Column/Column";
import { FlagSlider } from "~/components/FlagSlider/FlagSlider";
import {
  FlagSubflagSelect,
  SubflagOption,
} from "~/components/FlagSubflagSelect/FlagSubflagSelect";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

const subflagScalingProps = {
  // we dont need a secondary label. The descriptions will be short and accurate.
  defaultValue: 2,
  label: "",
};

const options: SubflagOption[] = [
  {
    defaultValue: 2,
    flag: "-lsced",
    label: "Characters + Espers + Dragons",
    helperText:
      "Enemies and bosses gain {{ . }} levels for each character recruited, esper acquired, and dragon defeated",
    Renderable: () => <FlagSlider {...subflagScalingProps} flag="-lsced" />,
  },
];

export const Scaling = () => {
  return (
    <Card title={"Scaling"}>
      <Column>
        <FlagSubflagSelect
          label="Level Scaling"
          nullableDescription="Enemy and boss levels are not scaled"
          nullableLabel="None"
          options={[]}
        />
      </Column>
    </Card>
  );
};
