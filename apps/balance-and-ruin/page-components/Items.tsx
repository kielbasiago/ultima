import { Chests } from "~/card-components/Chests";
import { Coliseum } from "~/card-components/Coliseum";
import { Shops } from "~/card-components/Shops";
import { StartingGoldAndItems } from "~/card-components/StartingGoldAndItems";
import { PageColumn } from "~/components/PageColumn/PageColumn";
import { PageContainer } from "~/components/PageContainer/PageContainer";

export const Items = () => {
  return (
    <PageContainer columns={2}>
      <StartingGoldAndItems />
      <Coliseum />
      <Shops />
      <Chests />
    </PageContainer>
  );
};
