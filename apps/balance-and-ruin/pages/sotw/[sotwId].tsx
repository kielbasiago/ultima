import Head from "next/head";
import { SotwPage } from "~/components/SotwPage/SotwPage";
import { useEffect, useState } from "react";

const SotwId = () => {
  const [sotw, setSotw] = useState(null)
  const [sotwId, setSotwId] = useState("")

  useEffect(() => {
    // get the last part of the URL
    //ref: https://github.com/vercel/next.js/discussions/12661#discussioncomment-98117
    const sotwIdParam = window.location.href.split('/').pop()!; 
    setSotwId(sotwIdParam)

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/sotws`)
      .then(res => res.json())
      .then(sotws => {
        const requestedSotw = sotws[sotwIdParam];
        setSotw(requestedSotw)
      })
  }, [])

  const head = (
    <Head>
      <Head>
        <title>FF6WC - Seed of the Week</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </Head>
  );

  if(sotw) {
    return <SotwPage head={head} id={sotwId} sotw={sotw} />;
  } else {
    return "Loading..."
  }
};

export default SotwId;
