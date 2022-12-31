import type { NextPage } from "next";
import Head from "next/head";
import EmoTracker from "~/components/EmoTracker/EmoTracker";
import { EmoTrackerLayout } from "~/components/EmoTracker/EmoTrackerLayout";
import { PageContainer } from "~/components/PageContainer";
import { wrapper } from "~/state/store";
import { TrackerMode } from "~/types/tracker";
import { Footer } from "~/components/Footer/Footer";
import { Header } from "@ff6wc/ui";
import { TempestHeader } from "~/components/TempestHeader/TempestHeader";

type PageProps = {};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({}) => {
      return {
        props: {},
      };
    }
);

const Manual: NextPage<PageProps> = ({}: PageProps) => {
  return (
    <>
      <Head>
        <title>FF6WC</title>
        <meta
          name="description"
          content="A Final Fantasy 6 open-world randomizer"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TempestHeader />
      <PageContainer>
        <EmoTracker mode={TrackerMode.MANUAL}>
          <EmoTrackerLayout />
        </EmoTracker>
      </PageContainer>
      <Footer />
    </>
  );
};

export default Manual;
