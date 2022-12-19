import { AuctionHouse } from "~/card-components/AuctionHouse";
import { Challenges } from "~/card-components/Challenges";
import { Checks } from "~/card-components/Checks";
import { MiscCard } from "~/card-components/MiscCard";
import { Movement } from "~/card-components/Movement";
import { RNG } from "~/card-components/RNG";
import { PageColumn } from "~/components/PageColumn/PageColumn";
import { PageContainer } from "~/components/PageContainer/PageContainer";

export const Gameplay = () => {
  return (
    <PageContainer>
      <PageColumn>
        <Movement />
        <Challenges />
        <Checks />
      </PageColumn>
      <PageColumn>
        <MiscCard />
        <RNG />
        <AuctionHouse />
      </PageColumn>
    </PageContainer>
  );
};
