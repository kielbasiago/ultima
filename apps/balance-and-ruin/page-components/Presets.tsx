import { Blitzes } from "~/card-components/Blitzes";
import { PartyMembers } from "~/card-components/PartyMembers";
import { Lores } from "~/card-components/Lores";
import { SwdTechs } from "~/card-components/SwdTechs";

export type PartyProps = Record<string, unknown>;

export const Presets = (props: PartyProps) => {
  const {} = props;
  return (
    <div className="flex flex-row justify-center flex-wrap gap-6">
      <div className="flex flex-col flex-grow gap-6 "></div>
      <div className="flex flex-col flex-grow gap-6"></div>
    </div>
  );
};
