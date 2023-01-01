import { characterNames } from "@ff6wc/ff6-types";
import { Card } from "@ff6wc/ui";
import startCase from "lodash/startCase";
import { Deprecated } from "~/components/Deprecated/Deprecated";
import { FlagRange } from "~/components/FlagRange/FlagRange";
import { FlagSelectOption } from "~/components/FlagSelect/FlagSelect";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

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

export const PartyMembers = () => {
  return (
    <Card title={"Party Members"}>
      <div className="flex flex-col flex-wrap gap-2">
        <FlagSwitch flag={"-sal"} label={"Start Average Level"} />
        <FlagSwitch flag={"-sn"} label={"Start Naked"} />
        <Deprecated>
          <FlagSwitch flag={"-eu"} label={"Equipable Umaro"} />
        </Deprecated>
        <FlagRange
          flag={"-csrp"}
          helperText="Each character stat is set to {{.}}% of the original value"
          label={"Character Stats"}
        />
      </div>
    </Card>
  );
};
