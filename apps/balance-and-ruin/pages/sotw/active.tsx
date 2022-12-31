import type { GetServerSideProps, NextPage } from "next";
import { SeedOfTheWeek } from "~/types/sotw";
import last from "lodash/last";
import orderBy from "lodash/orderBy";
import React from "react";
import Link from "next/link";
import Head from "next/head";
import { AppHeader } from "~/components/AppHeader/AppHeader";
import { Footer } from "~/components/Footer/Footer";

type PageProps = {
  sotw: Record<number, SeedOfTheWeek>;
};

export const getServerSideProps: GetServerSideProps<PageProps> = async ({}) => {
  const sotwPromise = fetch(
    "https://storage.googleapis.com/seedbot/sotw_db.json"
  );
  const sotw = await (await sotwPromise).json();
  return {
    props: {
      sotw,
    },
  };
};

const ActiveSOTW: NextPage<PageProps> = ({ sotw }: PageProps) => {
  const latestId = React.useMemo(
    () => last(orderBy(Object.keys(sotw))) as string,
    [sotw]
  );

  const latest = React.useMemo(
    () => sotw[Number.parseInt(latestId)],
    [latestId, sotw]
  );

  return (
    <div className="flex flex-col h-full items-center">
      <Head>
        <title>Seed of the Week - FF6WC</title>
        <meta
          name="description"
          content="A Final Fantasy VI open-world randomizer"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppHeader />

      <div className="flex flex-col flex-grow gpa-4 max-w-[900px] ">
        <h2 className="text-4xl">Seed of the Week</h2>
        <span>
          <Link className="underline" href={latest.seed} target="_blank">
            {latest.name}
          </Link>
        </span>

        <span>Flags submitted by {latest.submitter}</span>
      </div>
      <Footer />
    </div>
  );
};

export default ActiveSOTW;
