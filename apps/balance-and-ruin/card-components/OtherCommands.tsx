import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { Deprecated } from "~/components/Deprecated/Deprecated";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

export const OtherCommands = () => {
  return (
    <Card title={"Other"}>
      <CardColumn>
        <Deprecated>
          <FlagSwitch
            flag="-stra"
            label="SwdTech Runic All"
            helperText="All weapons enable SwdTech and Runic"
          />
        </Deprecated>
      </CardColumn>
    </Card>
  );
};
