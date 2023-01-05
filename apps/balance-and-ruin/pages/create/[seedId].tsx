import type { GetServerSideProps, NextPage } from "next";
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

const CreateFromSeedId: NextPage<PageProps> = ({ sotw, sotwId }: PageProps) => {
  return <>Currently in development</>;
};

export default CreateFromSeedId;
