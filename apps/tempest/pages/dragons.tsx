import type { NextPage } from "next";
import EmoTracker from "~/components/EmoTracker/EmoTracker";
import { EmoTrackerLayout } from "~/components/EmoTracker/EmoTrackerLayout";
import { PageContainer } from "~/components/PageContainer";
import { wrapper } from "~/state/store";
import { TrackerMode } from "~/types/tracker";
import { Footer } from "~/components/Footer/Footer";
import { TempestHeader } from "~/components/TempestHeader/TempestHeader";
import { TempestHead } from "~/components/TempestHead/TempestHead";
import { RowDragon } from "~/components/EmoTracker/RowDragon";

const Dragons = () => {
  return (
    <>
      <TempestHead />
      <TempestHeader />
      <PageContainer>
        <EmoTracker mode={TrackerMode.AUTO}>
          <RowDragon />
        </EmoTracker>
      </PageContainer>
      <Footer />
    </>
  );
};

export default Dragons;
