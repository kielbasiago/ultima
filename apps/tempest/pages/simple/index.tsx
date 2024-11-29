import type { NextPage } from "next";
import Head from "next/head";
import { Footer } from "~/components/Footer/Footer";
import { Header } from "@ff6wc/ui";
import EmoTracker from "~/components/EmoTracker/EmoTracker";
import { RowSimple } from "~/components/EmoTracker/RowSimple";
import { PageContainer } from "~/components/PageContainer";
import { wrapper } from "~/state/store";
import { TrackerMode } from "~/types/tracker";
import { TempestHeader } from "~/components/TempestHeader/TempestHeader";
import { TempestHead } from "~/components/TempestHead/TempestHead";
type PageProps = {};

const AutoSimple = () => {
  return (
    <>
      <TempestHead />
      <TempestHeader />
      <PageContainer>
        <EmoTracker mode={TrackerMode.AUTO}>
          <RowSimple />
        </EmoTracker>
      </PageContainer>
      <Footer />
    </>
  );
};

export default AutoSimple;
