import { Card, HelperText } from "@ff6wc/ui";
import { BetaLabel } from "~/components/BetaLabel/BetaLabel";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import {
  FlagSelect,
  FlagSelectOption,
} from "~/components/FlagSelect/FlagSelect";

const smart: FlagSelectOption = {
  value: "smart",
  label: "Smart",
  helperText:
    "When boss experience is enabled, dragon base experience is 200. This is comparable to old versions of WC. When boss experience is disabled, dragons base experience is 0.",
};

const expOptions: FlagSelectOption[] = [
  smart,
  {
    value: "statues",
    label: "Statues",
    helperText: (
      <div>
        Dragon base experience is 230. This is the same base experience as
        Goddess/Doom/Poltrgeist
      </div>
    ),
  },
  {
    value: "high",
    label: "High",
    helperText: (
      <div>
        Dragon base experience is 200. This is the same value as Smart with boss
        experience enabled
      </div>
    ),
  },
  {
    value: "medium",
    label: "Medium",
    helperText: (
      <div>
        Dragon base experience is 150. This is the average experience between
        Phunbaba 3 and Ultros 3
      </div>
    ),
  },
  {
    value: "low",
    label: "Low",
    helperText: (
      <div>
        Dragon base experience is 115. This is the average experience between
        Dadaluma and Ultros 2
      </div>
    ),
  },
  {
    value: "lowest",
    label: "Lowest",
    helperText: (
      <div>
        Dragon base experience is 95. This is the average experience between
        Whelk and Ultros 1
      </div>
    ),
  },
  {
    value: "none",
    label: "None",
    helperText: (
      <div>
        <>Dragon base experience is 0. Dragons reward no experience</>
      </div>
    ),
  },
];

const item: FlagSelectOption = {
  label: "Item",
  value: "i",
};

const rewardOptions: FlagSelectOption[] = [
  {
    label: "Character + Esper + Item",
    value: "cei",
  },
  {
    label: "Esper + Item",
    value: "ei",
  },
  item,
  {
    label: "None",
    value: "none",
  },
];

const checkPresetOptions: FlagSelectOption[] = [
  {
    label: "AH is Closed",
    helperText: "The auction house will only contain items",
    value: "ah",
  },
  {
    label: "No Free Characters",
    helperText:
      "The following events can only reward an esper or item: Collapsing House, Figaro Castle Throne, Gau's Father's House, Kohlingen Inn, Narshe Weapon Shop, Sealed Gate, South Figaro Basement",
    value: "nfc",
  },
  {
    label: "No Free Characters/Espers",
    helperText:
      "The following events only reward an item: Auction House, Collapsing House, Figaro Castle Throne, Gau's Father's House, Kohlingen Inn, Narshe Weapon Shop, Sealed Gate, South Figaro Basement, Tzen Thief",
    value: "nfce",
  },
];

export const BetaCard = () => {
  return (
    <Card title={"Beta"}>
      <HelperText variant="success">
        <div>
          <strong>Beta</strong> flags are those that are actively in development
          but open for testing and experimentation
        </div>
        <div>
          These may be unstable with bugs or may not be fully implemented
        </div>
      </HelperText>

      <CardColumn>
        <FlagSelect
          flag="-checks"
          label={<BetaLabel>Check Preset</BetaLabel>}
          nullable
          nullableLabel="None"
          options={checkPresetOptions}
        />

        <FlagSelect
          flag="-de"
          defaultValue={smart}
          label={<BetaLabel>Dragon Experience</BetaLabel>}
          options={expOptions}
        />

        <FlagSelect
          flag="-drewards"
          defaultValue={item}
          label={<BetaLabel>Dragon Rewards</BetaLabel>}
          options={rewardOptions}
        />
      </CardColumn>
    </Card>
  );
};
