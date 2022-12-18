import { Card } from "@ff6wc/ui";
import { characterNames } from "@ff6wc/ff6-types/wc";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import {
  FlagSelect,
  FlagSelectOption,
} from "~/components/FlagSelect/FlagSelect";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";
import { Divider } from "~/design-components/Divider/Divider";
import startCase from "lodash/startCase";
import { FlagLabel } from "~/components/FlagLabel/FlagLabel";

const [random]: FlagSelectOption[] = [{ id: "random", label: "Random" }];

const options: FlagSelectOption[] = [
  random,
  ...characterNames.map(
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
