import { Blitzes } from "~/card-components/Blitzes";
import { CommandsList } from "~/card-components/CommandsList";
import { CommandsExcluded } from "~/card-components/CommandsExcluded";
import { Lores } from "~/card-components/Lores";
import { SwdTechs } from "~/card-components/SwdTechs";
import { Rages } from "~/card-components/Rages";
import { Dances } from "~/card-components/Dances";
import { Steal } from "~/card-components/Steal";

export const Commands = () => {
  return (
    <div className="flex flex-row justify-center flex-wrap gap-6">
      <div className="flex-grow">
        <div className="flex flex-col gap-6">
          <SwdTechs />
          <Blitzes />
          <Lores />
          <Rages />
          <Dances />
          <Steal />
        </div>
      </div>
      <div className="flex flex-col flex-grow gap-6">
        <CommandsList />
        <CommandsExcluded />
      </div>
    </div>
  );
};
