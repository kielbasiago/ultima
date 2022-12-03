import { Card } from "@ff6wc/ui";
import { FlagsCard } from "~/components/FlagsCard/FlagsCard";
import {
  FlagSelect,
  FlagSelectOption,
} from "~/components/FlagSelect/FlagSelect";
import startCase from "lodash/startCase";
import { characterNames } from "@ff6wc/ff6-types";

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

export const StartParty = () => {
  return (
    <Card title={"Starting Party"}>
      <div className="flex flex-row flex-wrap justify-start gap-2">
        <FlagSelect
          flag={"-sc1"}
          label={"Start Character"}
          options={options}
          nullable
          nullableLabel="None"
        />
        {/* <FlagSelect
          flag={"-sc2"}
          label={"Start Character"}
          options={options}
          nullable
          nullableLabel="None"
        />
        <FlagSelect
          flag={"-sc3"}
          label={"Start Character"}
          options={options}
          nullable
          nullableLabel="None"
        />
        <FlagSelect
          flag={"-sc4"}
          label={"Start Character"}
          options={options}
          nullable
          nullableLabel="None"
        /> */}
      </div>
      <FlagsCard />
    </Card>
  );
};
