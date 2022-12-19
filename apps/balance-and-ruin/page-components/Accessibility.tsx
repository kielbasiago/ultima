import { AccessibilityCard } from "~/card-components/AccessibilityCard";
import { BossAI } from "~/card-components/BossAI";
import { BugFixes } from "~/card-components/BugFixes";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";
import { PageColumn } from "~/components/PageColumn/PageColumn";
import { PageContainer } from "~/components/PageContainer/PageContainer";

export const AccessibilityAndFixes = () => {
  return (
    <PageContainer>
      <PageColumn>
        <AccessibilityCard />
      </PageColumn>
      <PageColumn>
        <BugFixes />
        <BossAI />
      </PageColumn>
    </PageContainer>
  );
};
