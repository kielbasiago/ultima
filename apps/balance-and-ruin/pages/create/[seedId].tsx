import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Link } from "@ff6wc/ui";
import {
  DISCORD_URL,
  SOTW_SUBMISSION_URL,
} from "~/../../packages/utils/constants";
import { AppHeader } from "~/components/AppHeader/AppHeader";
import { Footer } from "~/components/Footer/Footer";
import { SeedOfTheWeek } from "~/types/sotw";
import { fetchSotwById } from "~/utils/sotwUtils";
import { SotwCard } from "~/components/SotwCard/SotwCard";
import { SotwPage } from "~/components/SotwPage/SotwPage";

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

const CreateFromSeedId: NextPage<PageProps> = ({ sotw, sotwId }: PageProps) => {
  const { name, submitter, seed } = sotw;
  const desc = `${name}\n\nCreated by ${submitter}\n\nDownload at ${seed}`;

  return <>Currently in development</>;
};

export default CreateFromSeedId;
