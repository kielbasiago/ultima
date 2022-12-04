import { Blitzes } from "~/card-components/Blitzes";
import { Characters } from "~/card-components/Characters";
import { Lores } from "~/card-components/Lores";
import { StartingParty } from "~/card-components/StartingParty";
import { SwdTechs } from "~/card-components/SwdTechs";

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
