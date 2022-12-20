import { Espers } from "~/card-components/Espers";
import { NaturalMagic } from "~/card-components/NaturalMagic";
import { Spells } from "~/card-components/Spells";
import { PageContainer } from "~/components/PageContainer/PageContainer";

export const Magic = () => {
  return (
    <PageContainer columns={2}>
      <Spells />
      <Espers />
      <NaturalMagic />
    </PageContainer>
  );
};
