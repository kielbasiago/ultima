import type { GetServerSideProps, NextPage } from "next";
import { SeedOfTheWeek } from "~/types/sotw";
import last from "lodash/last";
import orderBy from "lodash/orderBy";
import React from "react";
import Head from "next/head";
import { SotwPage } from "~/components/SotwPage/SotwPage";

type PageProps = {
  sotw: SeedOfTheWeek;
  sotwId: string;
  sotws: Record<number, SeedOfTheWeek>;
};

export const getServerSideProps: GetServerSideProps<PageProps> = async ({}) => {
  const sotwPromise = fetch(
    "https://storage.googleapis.com/seedbot/sotw_db.json"
  );
  const sotws = (await (await sotwPromise).json()) as Record<
    string | number,
    SeedOfTheWeek
  >;
  const keys = Object.keys(sotws);
  const ordered = orderBy(keys, (val) => Number.parseInt(val), "desc");
  const sotwId = ordered[0];
  const sotw = sotws[sotwId];

  console.log("keys", keys);
  console.log("ordered", ordered);
  console.log("sotwId", sotwId);
  return {
    props: {
      sotws,
      sotw,
      sotwId,
    },
  };
};

const ActiveSOTW: NextPage<PageProps> = ({ sotw, sotwId }: PageProps) => {
  const desc = `${sotw.name}\n\nCreated by ${sotw.submitter}\n\nDownload at ${sotw.seed}`;
  return (
    <SotwPage
      sotw={sotw}
      head={
        <Head>
          <title>FF6WC - Seed of the Week</title>
          <meta name="description" content={desc} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      }
      id={sotwId}
    />
  );
};

export default ActiveSOTW;
