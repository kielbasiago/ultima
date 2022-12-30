import { characterNames } from "@ff6wc/ff6-types/wc";
import { Card } from "@ff6wc/ui";
import startCase from "lodash/startCase";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { Deprecated } from "~/components/Deprecated/Deprecated";
import {
  FlagSelect,
  FlagSelectOption,
} from "~/components/FlagSelect/FlagSelect";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";
import { Divider } from "@ff6wc/ui/Divider/Divider";

const [random]: FlagSelectOption[] = [{ id: "random", label: "Random" }];

const excluded = ["gogo", "umaro"];
const naturalMagicCharacters = characterNames.filter(
  (c) => !excluded.includes(c)
);

const options: FlagSelectOption[] = [
  random,
  ...naturalMagicCharacters.map(
    (id) =>
      ({
        id,
        label: startCase(id),
      } as FlagSelectOption)
  ),
];

export const NaturalMagic = () => {
  return (
    <Card title={"Natural Magic"}>
      <CardColumn>
        <FlagSelect
          flag="-nm1"
          label="Terra's Natural Magic"
          nullable
          nullableLabel="None"
          options={options}
        />
        <FlagSwitch flag="-rnl1" label="Randomize Levels" />
        <FlagSwitch flag="-rns1" label="Randomize Spells" />

        <Divider />

        <FlagSelect
          flag="-nm2"
          label="Celes' Natural Magic"
          nullable
          nullableLabel="None"
          options={options}
        />

        <FlagSwitch flag="-rnl2" label="Randomize Levels" />
        <FlagSwitch flag="-rns2" label="Randomize Spells" />
        <Divider />
        <Deprecated>
          <FlagSwitch flag="-nmmi" label="Menu Indicator" />
          <Divider />
        </Deprecated>

        <FlagSwitch
          flag="-scan"
          helperText="All characters start with the Scan spell learned. Scan costs 0 MP. All enemies are scannable"
          label="Scan All"
        />
        <FlagSwitch
          flag="-warp"
          helperText="All characters start with the Warp spell learned. Warp costs 0 MP."
          label="Warp All"
        />
      </CardColumn>
    </Card>
  );
};
