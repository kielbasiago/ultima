import { Card } from "@ff6wc/ui";
import { FlagRange } from "~/components/FlagRange/FlagRange";
import { FlagsCard } from "~/components/FlagsCard/FlagsCard";
import { FlagSlider } from "~/components/FlagSlider/FlagSlider";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

export const Debug = () => {
  return (
    <div className="flex flex-row gap-10 flex-wrap">
      <Card className="flex-grow" title={"Debug"}>
        <div className="flex flex-col flex-wrap gap-4">
          <FlagSlider flag={"-lsced"} label={"Level Scaling C+E+D"} />
          <FlagRange flag={"-csb"} label="Cursed Shield Battles" />
          <FlagSwitch flag="-fst" label="Fast SwdTech" />
        </div>
      </Card>
      <Card className="flex-grow" title={"Debug"}>
        <div className="flex flex-col flex-wrap gap-4">
          <FlagSlider flag={"-lsced"} label={"Level Scaling C+E+D"} />
          <FlagSwitch flag="-fst" label="Fast SwdTech" />
        </div>
      </Card>
    </div>
  );
};
