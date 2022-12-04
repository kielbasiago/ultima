import { Blitzes } from "~/components/Panels/Party/Blitzes";
import { Characters } from "~/components/Panels/Party/Characters";
import { Lores } from "~/components/Panels/Party/Lores";
import { StartingParty } from "~/components/Panels/Party/StartingParty";
import { SwdTechs } from "~/components/Panels/Party/SwdTechs";

export type PartyProps = Record<string, unknown>;

export const Party = (props: PartyProps) => {
  const {} = props;
  return (
    <div className="flex flex-row justify-center flex-wrap gap-6">
      <div className="flex-grow">
        <div className="flex flex-col gap-6">
          <StartingParty />
          <SwdTechs />
          <Blitzes />
          <Lores />
        </div>
      </div>
      <div className="flex-grow gap-6">
        <Characters />
      </div>
    </div>
  );
};
