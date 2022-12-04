import { Card } from "@ff6wc/ui";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

export const Blitzes = () => {
  return (
    <Card title={"Blitzes"}>
      <div className="flex flex-col">
        <FlagSwitch flag="-brl" label="Bum Rush Last" />
        <FlagSwitch flag="-bel" label="Everyone Learns" />
      </div>
    </Card>
  );
};
