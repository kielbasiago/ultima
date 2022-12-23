import { Chests } from "~/card-components/Chests";
import { Coliseum } from "~/card-components/Coliseum";
import { EquipmentPermissions } from "~/card-components/EquipmentPermissions";
import { ItemRestrictions } from "~/card-components/ItemRestrictions";
import { OtherItems } from "~/card-components/OtherItems";
import { Shops } from "~/card-components/Shops";
import { StartingGoldAndItems } from "~/card-components/StartingGoldAndItems";
import { PageContainer } from "~/components/PageContainer/PageContainer";

export const Items = () => {
  return (
    <PageContainer columns={3}>
      <StartingGoldAndItems />
      <Shops />
      <Chests />
      <EquipmentPermissions />
      <ItemRestrictions />
      <OtherItems />
    </PageContainer>
  );
};
