import { AuctionHouse } from "~/card-components/AuctionHouse";
import { Challenges } from "~/card-components/Challenges";
import { Checks } from "~/card-components/Checks";
import { Coliseum } from "~/card-components/Coliseum";
import { MiscCard } from "~/card-components/MiscCard";
import { Movement } from "~/card-components/Movement";
import { PageContainer } from "~/components/PageContainer/PageContainer";

export const Gameplay = () => {
  return (
    <PageContainer columns={2}>
      <Movement />
      <MiscCard />
      <Coliseum />
      <Challenges />
      <Checks />
      <AuctionHouse />
    </PageContainer>
  );
};
