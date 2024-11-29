import Head from "next/head";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { MusicFooter } from "~/components/Footer/Footer";
import { GenerateJohnnydmadCard } from "~/components/GenerateJohnnydmadCard/GenerateJohnnydmadCard";
import { AppHeader } from "~/components/AppHeader/AppHeader";

type PageProps = {};

const MusicPage = () => {
  return (
    <>
      <Head>
        <title>FF6WC Music Randomizer</title>
        <meta
          name="description"
          content="Randomize the music in your FF6WC seed!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppHeader />
      <div className="flex-grow p-8 dark:bg-slate-800">
        <CardColumn>
          <GenerateJohnnydmadCard />
        </CardColumn>
      </div>
      <MusicFooter />
    </>
  );
};

export default MusicPage;
