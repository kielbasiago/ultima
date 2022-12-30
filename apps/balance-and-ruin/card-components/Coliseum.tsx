import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagRange } from "~/components/FlagRange/FlagRange";
import { FlagSlider } from "~/components/FlagSlider/FlagSlider";
import {
  FlagSubflagSelect,
  SubflagOption,
} from "~/components/FlagSubflagSelect/FlagSubflagSelect";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";
import { Divider } from "@ff6wc/ui/Divider/Divider";

const opponentOptions: SubflagOption[] = [
  {
    defaultValue: true,
    flag: "-cos",
    helperText: "",
    label: "Shuffle",
    isStatic: true,
  },
  {
    defaultValue: true,
    flag: "-cor",
    helperText: "",
    label: "Random",
    isStatic: true,
  },
];

const rewardOptions: SubflagOption[] = [
  {
    defaultValue: true,
    flag: "-crs",
    helperText: "",
    label: "Shuffle",
    isStatic: true,
  },
  {
    defaultValue: true,
    flag: "-crr",
    helperText: "",
    label: "Random",
    isStatic: true,
  },
];

const visibleRewardsOptions: SubflagOption[] = [
  {
    defaultValue: [255, 255],
    flag: "-crvr",
    helperText: "",
    label: "Random",
    Renderable: ({ children }) => (
      <FlagRange flag="-crvr" label={children} helperText="" />
    ),
  },
];

export const Coliseum = () => {
  return (
    <Card title={"Coliseum"}>
      <CardColumn>
        <FlagSubflagSelect
          options={opponentOptions}
          label={"Opponents"}
          nullable={{ description: "", label: "Original" }}
        />

        <FlagSubflagSelect
          options={rewardOptions}
          label={"Rewards"}
          nullable={{ description: "", label: "Original" }}
        />

        <FlagSubflagSelect
          options={visibleRewardsOptions}
          label={"Visible Rewards"}
          nullable={{ description: "", label: "Original" }}
        />

        <Divider />
        <FlagSwitch flag="-crm" label="Rewards Menu" />
        <FlagSwitch flag="-cnee" label="No Exp. Egg" />
        <FlagSwitch flag="-cnil" label="No Illumina" />
      </CardColumn>
    </Card>
  );
};
