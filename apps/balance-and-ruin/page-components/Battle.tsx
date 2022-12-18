import { Bosses } from "~/card-components/Bosses";
import { Encounters } from "~/card-components/Encounters";
import { ExperienceMagicPointsGold } from "~/card-components/ExperienceMagicPointsGold";
import { Scaling } from "~/card-components/Scaling";
import { PageColumn } from "~/components/PageColumn/PageColumn";
import { PageContainer } from "~/components/PageContainer/PageContainer";

export const Battle = () => {
  return (
    <PageContainer>
      <PageColumn>
        <ExperienceMagicPointsGold />
        <Bosses />
        <Encounters />
      </PageColumn>
      <PageColumn>
        <Scaling />
      </PageColumn>
    </PageContainer>
  );
};