import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagRange } from "~/components/FlagRange/FlagRange";
import { FlagSlider } from "~/components/FlagSlider/FlagSlider";
import { DualFlagSlider } from "~/components/DualFlagSlider/DualFlagSlider";
import {
  FlagSubflagSelect,
  SubflagOption,
} from "~/components/FlagSubflagSelect/FlagSubflagSelect";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";
import { BetaLabel } from "~/components/BetaLabel/BetaLabel";

const contentOptions: SubflagOption[] = [
  {
    defaultValue: 20,
    flag: "-ccsr",
    helperText:
      "Chests are shuffled, and each chest then has a {{ . }}% chance to be randomized",
    label: "Shuffle + Random",
    Renderable: ({ children }) => (
      <FlagSlider helperText={""} flag="-ccsr" label={children} />
    ),
  },
  {
    defaultValue: true,
    flag: "-ccrt",
    helperText:
      "Chest contents are categorized by tier and chosen at random. Higher tier items and equipment are less likely to be chosen",
    label: "Random Tiered",
    isStatic: true,
  },
  {
    defaultValue: true,
    flag: "-ccrs",
    helperText:
      "Chest contents are categorized by tier and chosen at random. The odds of higher tier items and equipment increases as more chests are opened",
    label: "Random Scaled",
    isStatic: true,
  },
  {
    defaultValue: true,
    flag: "-cce",
    helperText: "All chests are empty",
    label: "Empty",
    isStatic: true,
  },
];
export const Chests = () => {
  return (
    <Card title={"Chests"}>
      <CardColumn>
        <FlagSubflagSelect
          options={contentOptions}
          label="Contents"
          nullable={{
            description: "Chests are unchanged",
            label: "Original",
          }}
        />
        <FlagSwitch flag="-cms" label="MIAB Shuffled" />
        <DualFlagSlider 
          flag="-chrm" 
          label={<BetaLabel>Random Monsters</BetaLabel>}
          helperText="Chest contents will contain {{a}}% enemies and, of those, {{b}}% bosses"
          aText="Enemies" 
          bText="Bosses" />
      </CardColumn>
    </Card>
  );
};
