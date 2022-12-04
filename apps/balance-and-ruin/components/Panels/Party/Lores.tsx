import { Card } from "@ff6wc/ui";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

export const Lores = () => {
  return (
    <Card title={"Lores"}>
      <div className="flex flex-col">
        <FlagSwitch flag="-lel" label="Everyone Learns" />
      </div>
    </Card>
  );
};
