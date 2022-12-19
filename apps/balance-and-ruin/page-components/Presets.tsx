import { Encounters } from "~/card-components/Encounters";
import { PresetsCard } from "~/card-components/PresetsCard";
import { PageColumn } from "~/components/PageColumn/PageColumn";
import { PageContainer } from "~/components/PageContainer/PageContainer";

export const Presets = () => {
  return (
    <PageContainer>
      <PageColumn>
        <PresetsCard />
      </PageColumn>
    </PageContainer>
  );
};
