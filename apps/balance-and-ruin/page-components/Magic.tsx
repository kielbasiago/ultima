import { Espers } from "~/card-components/Espers";
import { NaturalMagic } from "~/card-components/NaturalMagic";
import { Spells } from "~/card-components/Spells";
import { PageColumn } from "~/components/PageColumn/PageColumn";
import { PageContainer } from "~/components/PageContainer/PageContainer";

export const Magic = () => {
  return (
    <PageContainer>
      <PageColumn>
        <Spells />
        <Espers />
      </PageColumn>
      <PageColumn>
        <NaturalMagic />
      </PageColumn>
    </PageContainer>
  );
};
