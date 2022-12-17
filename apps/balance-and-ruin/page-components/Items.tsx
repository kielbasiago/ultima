import { StartingGoldAndItems } from "~/card-components/StartingGoldAndItems";
import { PageColumn } from "~/components/PageColumn/PageColumn";
import { PageContainer } from "~/components/PageContainer/PageContainer";

export const Items = () => {
  return (
    <PageContainer>
      <PageColumn>
        <StartingGoldAndItems />
      </PageColumn>
      <PageColumn>
        <StartingGoldAndItems />
      </PageColumn>
    </PageContainer>
  );
};
