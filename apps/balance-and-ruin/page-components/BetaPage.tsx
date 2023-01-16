import { BetaCard } from "~/card-components/BetaCard";
import { BetaPresets } from "~/card-components/BetaPresetsCard";
import { WorkshopCard } from "~/card-components/WorkshopCard";
import { PageContainer } from "~/components/PageContainer/PageContainer";

export const BetaPage = () => {
  return (
    <PageContainer columns={1}>
      <BetaPresets />
      <BetaCard />
      <WorkshopCard />
    </PageContainer>
  );
};
