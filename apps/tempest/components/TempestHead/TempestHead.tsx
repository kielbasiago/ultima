import Head from "next/head";
import { TRACKER_DESCRIPTION } from "~/utils/constants";

export const TempestHead = () => (
  <Head>
    <title>FF6WC Tracker</title>
    <meta name="description" content={TRACKER_DESCRIPTION} />
    <link rel="icon" href="/favicon.ico" />
  </Head>
);
