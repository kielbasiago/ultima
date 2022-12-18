import { Espers } from "~/card-components/Espers";
import { NaturalMagic } from "~/card-components/NaturalMagic";
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
