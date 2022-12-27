import type { NextPage } from "next";
import Head from "next/head";
import EmoTracker from "~/components/EmoTracker/EmoTracker";
import { EmoTrackerLayout } from "~/components/EmoTracker/EmoTrackerLayout";
import { PageContainer } from "~/components/PageContainer";
import { wrapper } from "~/state/store";
import { TrackerMode } from "~/types/tracker";
import { Disclaimer } from "../../balance-and-ruin/components/Disclaimer/Disclaimer";
import { Header } from "../../balance-and-ruin/components/Header/Header";
type PageProps = {};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({}) => {
      return {
        props: {},
      };
    }
);

const Auto: NextPage<PageProps> = ({}: PageProps) => {
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
      <Header />
      <PageContainer>
        <EmoTracker mode={TrackerMode.AUTO}>
          <EmoTrackerLayout />
        </EmoTracker>
      </PageContainer>
      <Disclaimer />
    </>
  );
};

export default Auto;
