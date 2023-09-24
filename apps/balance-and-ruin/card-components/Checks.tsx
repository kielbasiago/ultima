import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";
import { BetaLabel } from "~/components/BetaLabel/BetaLabel";
import {
  FlagSubflagSelect,
  SubflagOption,
} from "~/components/FlagSubflagSelect/FlagSubflagSelect";

const STANDARD_IR = {
  defaultValue: "standard",
  flag: "-ir",
  helperText:
    "Possible Item Rewards: ValiantKnife, Illumina, Ragnarok, Atma Weapon, Pearl Lance, Aura Lance, Magus Rod, Fixed Dice, Aegis Shld, Flame Shld, Ice Shld, Thunder Shld, Genji Shld, Paladin Shld, Force Shld, Red Cap, Cat Hood, Genji Helmet, Force Armor, Genji Armor, Minerva, BehemothSuit, Snow Muffler, Economizer, Genji Glove, Offering, Gem Box, Dragon Horn, Marvel Shoes, Exp. Egg",
  label: "Standard",
  isStatic: true,
}

const irOptions: SubflagOption[] = [
  STANDARD_IR,
  {
    defaultValue: "premium",
    flag: "-ir",
    helperText: () => (
      <BetaLabel>
        Possible Item Rewards: ValiantKnife, Illumina, Ragnarok, Atma Weapon, Fixed Dice, Flame Shld, Ice Shld, Thunder Shld, Paladin Shld, Minerva, Genji Glove, Offering, Exp. Egg
      </BetaLabel>
    ),
    label: "Premium",
    isStatic: true,
  },
];

export const Checks = () => {
  return (
    <Card title={"Checks"}>
      <CardColumn>
        <FlagSwitch 
          flag="-nfce" 
          label="No Free Characters/Espers"
          helperText={
            <span>
              Remove character/esper rewards from: Auction House, Collapsing House, Figaro Castle Throne, Gau's Father's House, Kohlingen Inn, Narshe Weapon Shop, Sealed Gate, South Figaro Basement, <BetaLabel>Mt. Zozo, and Lone Wolf</BetaLabel>
            </span>
          } />
        <FlagSubflagSelect
          defaultSelected={STANDARD_IR}
          label={<BetaLabel>Item Rewards</BetaLabel>}
          options={irOptions}
        />
      </CardColumn>
    </Card>
  );
};
