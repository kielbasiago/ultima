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
import { BetaLabel } from "~/components/BetaLabel/BetaLabel";

const opponentOptions: SubflagOption[] = [
  {
    defaultValue: 100,
    flag: "-cor",
    helperText: "Coliseum opponents original with a given percent randomized",
    label: "Random",
    Renderable: ({ children }) => (
      <FlagSlider flag="-cor" label={children} helperText="" />
    ),
  },
  {
    defaultValue: 0,
    flag: "-cosr",
    helperText: "Coliseum opponents shuffled and then given percent randomized",
    label: "Shuffle + Random",
    Renderable: ({ children }) => (
      <FlagSlider flag="-cosr" label={children} helperText="" />
    ),
  },
];

const rewardOptions: SubflagOption[] = [
  {
    defaultValue: 100,
    flag: "-crr",
    helperText: "Coliseum rewards original with a given percent randomized",
    label: "Random",
    Renderable: ({ children }) => (
      <FlagSlider flag="-crr" label={children} helperText="" />
    ),
  },
  {
    defaultValue: 0,
    flag: "-crsr",
    helperText: "Coliseum rewards shuffled and then a given percent randomized",
    label: "Shuffle + Random",
    Renderable: ({ children }) => (
      <FlagSlider flag="-crsr" label={children} helperText="" />
    ),
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
