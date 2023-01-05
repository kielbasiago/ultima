import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { SotwPage } from "~/components/SotwPage/SotwPage";
import { SeedOfTheWeek } from "~/types/sotw";
import { fetchSotwById } from "~/utils/sotwUtils";

type PageProps = {
  sotwId: string;
  sotw: SeedOfTheWeek;
};

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  params,
}) => {
  const { sotwId } = (params || {}) as Record<string, string>;
  const sotw = await fetchSotwById(sotwId);
  return {
    props: {
      sotw,
      sotwId,
    },
  };
};

const SotwId: NextPage<PageProps> = ({ sotw, sotwId }: PageProps) => {
  const { name, submitter, description } = sotw;
  const desc = `${name}\nCreated by ${submitter}\n\n${description ?? ""}`;

  const head = (
    <Head>
      <Head>
        <title>FF6WC - Seed of the Week</title>
        <meta name="description" content={desc} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </Head>
  );
  return <SotwPage head={head} id={sotwId} sotw={sotw} />;
};

export default SotwId;
