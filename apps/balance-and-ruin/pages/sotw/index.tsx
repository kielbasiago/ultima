
import orderBy from "lodash/orderBy";
import { useEffect, useState} from "react";
import Head from "next/head";
import { SotwPage } from "~/components/SotwPage/SotwPage";

const ActiveSOTW = () => {

  const [sotw, setSotw] = useState(null)
  const [sotwId, setSotwId] = useState("")

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search)
    let id = queryParameters.get("id")

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/sotws`)
      .then(res => res.json())
      .then(sotws => {
        const keys = Object.keys(sotws);
        if(!id) { // no parameter given -- get the latest SOTW instead
          const ordered = orderBy(keys, (val) => Number.parseInt(val), "desc");
          id = ordered[0];
        }
        setSotwId(id)
        setSotw(sotws[id]);
      })
  }, [])

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

}

export default ActiveSOTW;
