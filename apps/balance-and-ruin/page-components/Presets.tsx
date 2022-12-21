import { PresetsCard } from "~/card-components/PresetsCard";
import { PageColumn } from "~/components/PageColumn/PageColumn";
import { PageContainer } from "~/components/PageContainer/PageContainer";
import useSWR from "swr";

const usePresets = () => {
  useSWR([""], () => {});
};

export const Presets = () => {
  return (
    <PageContainer>
      <PageColumn>
        <PresetsCard presets={[]} />
      </PageColumn>
    </PageContainer>
  );
};
