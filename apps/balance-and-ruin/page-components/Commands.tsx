import { Blitzes } from "~/card-components/Blitzes";
import { CommandsExcluded } from "~/card-components/CommandsExcluded";
import { CommandsList } from "~/card-components/CommandsList";
import { Dances } from "~/card-components/Dances";
import { Lores } from "~/card-components/Lores";
import { Rages } from "~/card-components/Rages";
import { Steal } from "~/card-components/Steal";
import { SwdTechs } from "~/card-components/SwdTechs";
import { PageColumn } from "~/components/PageColumn/PageColumn";
import { PageContainer } from "~/components/PageContainer/PageContainer";

export const Commands = () => {
  return (
    <PageContainer>
      <PageColumn>
        <SwdTechs />
        <Blitzes />
        <Lores />
        <Rages />
        <Dances />
        <Steal />
      </PageColumn>
      <PageColumn>
        <CommandsList />
        <CommandsExcluded />
      </PageColumn>
    </PageContainer>
  );
};
