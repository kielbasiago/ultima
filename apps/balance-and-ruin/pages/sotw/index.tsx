import type { GetServerSideProps, NextPage } from "next";
import { SeedOfTheWeek } from "~/types/sotw";
import orderBy from "lodash/orderBy";
import { useEffect, useState} from "react";
import Head from "next/head";
import { SotwPage } from "~/components/SotwPage/SotwPage";

const ActiveSOTW = () => {
  const [sotw, setSotw] = useState(null)
  const [sotwId, setSotwId] = useState("")

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/sotws`)
      .then(res => res.json())
      .then(sotws => {
        const keys = Object.keys(sotws);
        const ordered = orderBy(keys, (val) => Number.parseInt(val), "desc");
        const latestId = ordered[0];
        setSotwId(latestId)
        setSotw(sotws[latestId]);
      })
  }, [])

  if(sotw) {
    return (
    <SotwPage
      sotw={sotw}
      head={
        <Head>
          <title>FF6WC - Seed of the Week</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      }
      id={sotwId}
    />)
  } else {
    return(<p>Loading...</p>)
  }
}

export default ActiveSOTW;
