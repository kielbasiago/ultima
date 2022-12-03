import { Card } from "@ff6wc/ui";
import { FlagRange } from "~/components/FlagRange/FlagRange";
import { FlagsCard } from "~/components/FlagsCard/FlagsCard";
import { FlagSlider } from "~/components/FlagSlider/FlagSlider";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

export const Debug = () => {
  return (
    <div className="flex flex-row gap-10 flex-wrap">
      <Card className="flex-grow" title={"Scaling"}>
        <div className="flex flex-col flex-wrap gap-4">
          <FlagSlider flag={"-lsced"} label={"Level Scaling"} />
          <FlagSlider flag={"-hmced"} label={"HP/MP Scaling"} />
          <FlagSlider flag={"-xgced"} label={"Exp/GP Scaling"} />
          <FlagSwitch flag={"-sed"} label={"Scale Eight Dragons"} />
          <FlagSwitch flag={"-sfb"} label={"Scale Final Battles"} />
          <FlagRange flag={"-csb"} label={"Cursed Shield Battles"} />
        </div>
      </Card>
    </div>
  );
};
