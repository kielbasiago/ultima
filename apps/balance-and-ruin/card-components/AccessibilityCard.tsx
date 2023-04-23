import { Card } from "@ff6wc/ui";
import { BetaLabel } from "~/components/BetaLabel/BetaLabel";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import {
  FlagSubflagSelect,
  SubflagOption,
} from "~/components/FlagSubflagSelect/FlagSubflagSelect";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

const flashOptions: SubflagOption[] = [
  {
    defaultValue: true,
    flag: "-frw",
    helperText:
      "Removes only the worst flashes from animations. Ex: Learning Bum Rush, Bum Rush, Quadra Slam/Slice, Flash, etc.",
    label: "Worst",
    isStatic: true,
  },
  {
    defaultValue: true,
    flag: "-frm",
    helperText: "Removes most flashes from animations",
    label: "Most",
    isStatic: true,
  },
];
export const AccessibilityCard = () => {
  return (
    <Card title={"Accessibility"}>
      <CardColumn>
        <FlagSubflagSelect
          label="Remove Flashes"
          nullable={{
            description: "Screen flashes are unchanged",
            label: "None",
          }}
          options={flashOptions}
        />

        <FlagSwitch
          flag="-wmhc"
          helperText="Makes the world minimap opaque and increases the contrast for better visibility"
          label="High-Contrast World Minimap"
        />

        <FlagSwitch
          flag="-ahtc"
          helperText="Makes healing text blue, to be able to distinguish easier from damage text"
          label={<BetaLabel>Alternate Healing Text Color</BetaLabel>}
        />
      </CardColumn>
    </Card>
  );
};
