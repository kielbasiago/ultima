import { Chests } from "~/card-components/Chests";
import { Coliseum } from "~/card-components/Coliseum";
import { Espers } from "~/card-components/Espers";
import { NaturalMagic } from "~/card-components/NaturalMagic";
import { Shops } from "~/card-components/Shops";
import { StartingGoldAndItems } from "~/card-components/StartingGoldAndItems";
import { PageColumn } from "~/components/PageColumn/PageColumn";
import { PageContainer } from "~/components/PageContainer/PageContainer";

export const Magic = () => {
  return (
    <PageContainer>
      <PageColumn>
        <Espers />
      </PageColumn>
      <PageColumn>
        <NaturalMagic />
      </PageColumn>
    </PageContainer>
  );
};
