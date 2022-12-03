import { Card } from "@ff6wc/ui";
import { FlagsCard } from "~/components/FlagsCard/FlagsCard";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

export const SwdTechs = () => {
  return (
    <Card title={"SwdTech"}>
      <div className="flex flex-row flex-wrap gap-2">
        <FlagSwitch flag="-fst" label="Fast SwdTech" />
      </div>
      <FlagsCard />
    </Card>
  );
};
