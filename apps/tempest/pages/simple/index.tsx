import type { NextPage } from "next";
import Head from "next/head";
import { Disclaimer } from "~/../balance-and-ruin/components/Disclaimer/Disclaimer";
import { Header } from "~/../balance-and-ruin/components/Header/Header";
import EmoTracker from "~/components/EmoTracker/EmoTracker";
import { RowSimple } from "~/components/EmoTracker/RowSimple";
import { PageContainer } from "~/components/PageContainer";
import { wrapper } from "~/state/store";
import { TrackerMode } from "~/types/tracker";
type PageProps = {};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({}) => {
      return {
        props: {},
      };
    }
);

const AutoSimple: NextPage<PageProps> = ({}: PageProps) => {
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
          <RowSimple />
        </EmoTracker>
      </PageContainer>
      <Disclaimer />
    </>
  );
};

export default AutoSimple;
