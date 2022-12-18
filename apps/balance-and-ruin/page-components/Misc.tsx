import { Bosses } from "~/card-components/Bosses";
import { Challenges } from "~/card-components/Challenges";
import { Checks } from "~/card-components/Checks";
import { ExperienceMagicPointsGold } from "~/card-components/ExperienceMagicPointsGold";
import { Movement } from "~/card-components/Movement";
import { Scaling } from "~/card-components/Scaling";
import { PageColumn } from "~/components/PageColumn/PageColumn";
import { PageContainer } from "~/components/PageContainer/PageContainer";

export const Misc = () => {
  return (
    <PageContainer>
      <PageColumn>
        <Movement />
      </PageColumn>
      <PageColumn>
        <Checks />
        <Challenges />
      </PageColumn>
    </PageContainer>
  );
};
