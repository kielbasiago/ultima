import { AuctionHouse } from "~/card-components/AuctionHouse";
import { BossAI } from "~/card-components/BossAI";
import { BugFixes } from "~/card-components/BugFixes";
import { Challenges } from "~/card-components/Challenges";
import { Checks } from "~/card-components/Checks";
import { MiscCard } from "~/card-components/MiscCard";
import { Movement } from "~/card-components/Movement";
import { RNG } from "~/card-components/RNG";
import { PageColumn } from "~/components/PageColumn/PageColumn";
import { PageContainer } from "~/components/PageContainer/PageContainer";

export const Misc = () => {
  return (
    <PageContainer>
      <PageColumn>
        <Movement />
        <RNG />
        <AuctionHouse />
        <MiscCard />
      </PageColumn>
      <PageColumn>
        <Checks />
        <Challenges />
        <BossAI />
        <BugFixes />
      </PageColumn>
    </PageContainer>
  );
};
