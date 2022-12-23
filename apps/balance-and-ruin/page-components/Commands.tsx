import { Blitzes } from "~/card-components/Blitzes";
import { CommandsExcluded } from "~/card-components/CommandsExcluded";
import { CommandsList } from "~/card-components/CommandsList";
import { Dances } from "~/card-components/Dances";
import { Lores } from "~/card-components/Lores";
import { OtherCommands } from "~/card-components/OtherCommands";
import { Rages } from "~/card-components/Rages";
import { SketchControl } from "~/card-components/SketchControl";
import { StealCapture } from "~/card-components/StealCapture";
import { SwdTechs } from "~/card-components/SwdTechs";
import { Tools } from "~/card-components/Tools";
import { PageColumn } from "~/components/PageColumn/PageColumn";
import { PageContainer } from "~/components/PageContainer/PageContainer";

export const Commands = () => {
  return (
    <PageContainer columns={3}>
      <CommandsList />
      <CommandsExcluded />
      <StealCapture />
      <SwdTechs />
      <Tools />
      <Blitzes />
      <Lores />
      <SketchControl />
      <Dances />
      <Rages />
      <OtherCommands />
    </PageContainer>
  );
};
