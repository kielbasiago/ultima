import { PartyMembers } from "~/card-components/PartyMembers";
import { StartingParty } from "~/card-components/StartingParty";
import { PageColumn } from "~/components/PageColumn/PageColumn";
import { PageContainer } from "~/components/PageContainer/PageContainer";

export const Party = () => {
  return (
    <PageContainer columns={1}>
      <StartingParty />
      <PartyMembers />
    </PageContainer>
  );
};
