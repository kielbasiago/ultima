import { useSelector } from "react-redux";
import { AccessibilityCard } from "~/card-components/AccessibilityCard";
import { BossAI } from "~/card-components/BossAI";
import { BugFixes } from "~/card-components/BugFixes";
import { Deprecated } from "~/components/Deprecated/Deprecated";
import { PageContainer } from "~/components/PageContainer/PageContainer";
import { selectSettings } from "~/state/settingsSlice";

export const Fixes = () => {
  const { showDeprecated } = useSelector(selectSettings);
  return (
    <PageContainer columns={1}>
      <Deprecated>
        <BugFixes />
        <BossAI />
      </Deprecated>
    </PageContainer>
  );
};
