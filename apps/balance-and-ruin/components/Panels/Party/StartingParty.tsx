import { Card } from "@ff6wc/ui";
import { FlagsCard } from "~/components/FlagsCard/FlagsCard";
import { FlagSelect } from "~/components/FlagSelect/FlagSelect";

export const StartParty = () => {
  return (
    <Card title={"Starting Party"}>
      <div className="flex flex-row flex-wrap gap-2">
        <FlagSelect flag={"-sc1"} label={"Start Character"} />
        <FlagSelect flag={"-sc2"} label={"Start Character"} />
        <FlagSelect flag={"-sc3"} label={"Start Character"} />
        <FlagSelect flag={"-sc4"} label={"Start Character"} />
      </div>
      <FlagsCard />
    </Card>
  );
};
