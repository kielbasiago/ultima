import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";
import { Divider } from "@ff6wc/ui/Divider/Divider";

export const Challenges = () => {
  return (
    <Card title={"Challenges"}>
      <CardColumn>
        <FlagSwitch flag="-pd" label="Permadeath" />
        <FlagSwitch flag="-bnds" label="Normalize & Distort Boss Stats" />
        <FlagSwitch
          flag="-srp3"
          helperText="Allow Phunbaba 3 to be shuffled and randomized (Otherwise he will only appear in Mobliz WOR)"
          label="Add Phunbaba 3 to Boss Pool"
        />
      </CardColumn>
    </Card>
  );
};
