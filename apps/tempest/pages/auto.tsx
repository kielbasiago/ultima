import type { NextPage } from "next";
import EmoTracker from "~/components/EmoTracker/EmoTracker";
import { EmoTrackerLayout } from "~/components/EmoTracker/EmoTrackerLayout";
import { PageContainer } from "~/components/PageContainer";
import { wrapper } from "~/state/store";
import { TrackerMode } from "~/types/tracker";
import { Footer } from "~/components/Footer/Footer";
import { TempestHeader } from "~/components/TempestHeader/TempestHeader";
import { TempestHead } from "~/components/TempestHead/TempestHead";

type PageProps = {
  showLayout?: boolean;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({}) => {
      return {
        props: {},
      };
    }
);

const Auto: NextPage<PageProps> = ({ showLayout = true }: PageProps) => {
  return (
    <>
      <TempestHead />
      {showLayout ? <TempestHeader /> : null}
      <PageContainer gutters={showLayout}>
        <EmoTracker mode={TrackerMode.AUTO} showButtons={showLayout}>
          <EmoTrackerLayout />
        </EmoTracker>
      </PageContainer>
      {showLayout ? <Footer /> : null}
    </>
  );
};

export default Auto;
