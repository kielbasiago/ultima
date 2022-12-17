import { PageColumn } from "~/components/PageColumn/PageColumn";
import { PageContainer } from "~/components/PageContainer/PageContainer";

export type PartyProps = Record<string, unknown>;

export const Presets = (props: PartyProps) => {
  const {} = props;
  return (
    <PageContainer>
      <PageColumn>Foo</PageColumn>
      <PageColumn>Bar</PageColumn>
    </PageContainer>
  );
};
