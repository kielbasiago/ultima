import { AccessibilityCard } from "~/card-components/AccessibilityCard";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";
import { PageColumn } from "~/components/PageColumn/PageColumn";
import { PageContainer } from "~/components/PageContainer/PageContainer";

export const Accessibility = () => {
  return (
    <PageContainer>
      <PageColumn>
        <AccessibilityCard />
      </PageColumn>
    </PageContainer>
  );
};
