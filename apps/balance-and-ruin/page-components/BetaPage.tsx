import { BetaCard } from "~/card-components/BetaCard";
import { WorkshopCard } from "~/card-components/WorkshopCard";
import { PageContainer } from "~/components/PageContainer/PageContainer";

export const BetaPage = () => {
  return (
    <PageContainer columns={1}>
      <BetaCard />
      <WorkshopCard />
    </PageContainer>
  );
};
