import { Card } from "@ff6wc/ui";
import {
  FlagSelect,
  FlagSelectOption,
} from "~/components/FlagSelect/FlagSelect";
import startCase from "lodash/startCase";
import { characterNames } from "@ff6wc/ff6-types";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagSlider } from "~/components/FlagSlider/FlagSlider";
import { Divider } from "~/design-components/Divider/Divider";

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

export const StartingParty = () => {
  return (
    <Card title={"Starting Party"}>
      <CardColumn>
        <FlagSelect
          flag={"-sc1"}
          label={"Start Character"}
          options={options}
          nullable
          nullableLabel="None"
        />
        <FlagSelect
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
        />

        <Divider>Amazing</Divider>

        <FlagSlider
          flag="-stl"
          helperText="Starty party begins the game at level {{ . }}"
          label="Starting Party Level"
        />
      </CardColumn>
    </Card>
  );
};
