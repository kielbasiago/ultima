import { BossAI } from "~/card-components/BossAI";
import { Challenges } from "~/card-components/Challenges";
import { Checks } from "~/card-components/Checks";
import { Movement } from "~/card-components/Movement";
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
        <BossAI />
      </PageColumn>
    </PageContainer>
  );
};
