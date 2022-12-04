import { Card } from "@ff6wc/ui";
import { FlagsCard } from "~/components/FlagsCard/FlagsCard";
import {
  FlagSelect,
  FlagSelectOption,
} from "~/components/FlagSelect/FlagSelect";
import startCase from "lodash/startCase";
import { characterNames } from "@ff6wc/ff6-types";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";
import { FlagRange } from "~/components/FlagRange/FlagRange";

const [random, randomngu]: FlagSelectOption[] = [
  { id: "random", label: "Random" },
  { id: "randomngu", label: "Random (No Gogo/Umaro)" },
];

const options = [
  random,
  randomngu,
  ...characterNames.map(
    (id) =>
      ({
        id,
        label: startCase(id),
      } as FlagSelectOption)
  ),
];

export const Characters = () => {
  return (
    <Card title={"Characters"}>
      <div className="flex flex-col flex-wrap gap-2">
        <FlagSwitch flag={"-sal"} label={"Start Average Level"} />
        <FlagSwitch flag={"-sn"} label={"Start Naked"} />
        <FlagSwitch flag={"-eu"} label={"Equipable Umaro"} />
        <FlagRange flag={"-csrp"} label={"Character Stats"} />
      </div>
    </Card>
  );
};
