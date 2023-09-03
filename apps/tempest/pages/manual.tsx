import { useState } from 'react'
import EmoTracker from "~/components/EmoTracker/EmoTracker";
import { EmoTrackerLayout } from "~/components/EmoTracker/EmoTrackerLayout";
import { PageContainer } from "~/components/PageContainer";
import { TrackerMode } from "~/types/tracker";
import { Footer } from "~/components/Footer/Footer";
import { TempestHeader } from "~/components/TempestHeader/TempestHeader";
import { TempestHead } from "~/components/TempestHead/TempestHead";


const Manual = () => {
  const [showLayout, setShowLayout] = useState(true)
  return (
    <>
      <TempestHead />
      {showLayout ? <TempestHeader /> : null}
      <PageContainer gutters={showLayout}>
        <EmoTracker mode={TrackerMode.MANUAL}>
          <EmoTrackerLayout />
        </EmoTracker>
      </PageContainer>
      {showLayout ? <Footer /> : null}
    </>
  );
};

export default Manual;
