import type { NextPage } from "next";
import Head from "next/head";
import { FlagsCard } from "~/card-components/Flags";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { Disclaimer } from "~/components/Disclaimer/Disclaimer";
import { GenerateCard } from "~/components/GenerateCard/GenerateCard";
import { GenerateJohnnydmadCard } from "~/components/GenerateJohnnydmadCard/GenerateJohnnydmadCard";
import { Header } from "~/components/Header/Header";
import { wrapper } from "~/state/store";

type PageProps = {};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({}) => {
      return {
        props: {},
      };
    }
);

const MusicPage: NextPage<PageProps> = ({}: PageProps) => {
  return (
    <>
      <Head>
        <title>FF6WC Music Randomizer</title>
        <meta
          name="description"
          content="Randomize the music in your FF6WC seed - Powered by johnnydmad"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex-grow p-8 dark:bg-slate-800">
        <CardColumn>
          <GenerateJohnnydmadCard />
        </CardColumn>
      </div>
      <Disclaimer />
    </>
  );
};

export default MusicPage;
