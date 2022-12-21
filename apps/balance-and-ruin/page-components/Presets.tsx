import { PresetsCard } from "~/card-components/PresetsCard";
import { PageColumn } from "~/components/PageColumn/PageColumn";
import { PageContainer } from "~/components/PageContainer/PageContainer";
import { SelectOption } from "~/components/Select/Select";

type PresetPayload = {};

export const Presets = () => {
  return (
    <PageContainer>
      <PageColumn>
        <PresetsCard presets={[]} />
      </PageColumn>
    </PageContainer>
  );
};
