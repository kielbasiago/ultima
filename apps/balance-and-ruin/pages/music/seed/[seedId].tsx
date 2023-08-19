import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { MusicFooter } from "~/components/Footer/Footer";
import { CodeBlock } from "@ff6wc/ui";
import { MusicSeedCard } from "~/components/MusicSeedCard/MusicSeedCard";
import { SeedData } from "~/components/SeedCard/SeedCard";
import { Card } from "@ff6wc/ui";
import { setRawFlags } from "~/state/flagSlice";
import { AppHeader } from "~/components/AppHeader/AppHeader";

type PathParams = {
  seedId: string;
};

type SeedResponse = {
  data: SeedData;
  errors: string[];
  success: boolean;
};

type Props = {
  seed: SeedData;
  seedId: string;
};

export const getServerSideProps: GetServerSideProps<
  Props,
  PathParams
> = async ({ params, res }) => {
  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  const { seedId } = params as PathParams;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/seed/ff6wc/${seedId}`;
  const response = await fetch(url);
  const { data: seed, errors, success }: SeedResponse = await response.json();

  if (!success || errors.length) {
    throw new Error(`Error loading seed ${seedId}`);
  }
  return {
    props: {
      seed,
      seedId,
    },
  };
};

const FIRST_LINE_REGEX = /^.+\s+/;

export default function SeedId({ seed, seedId }: Props) {
  const dispatch = useDispatch();
  const { flags, log: logWithFlags, patch } = seed;

  const title = `FF6WC music seed ${seedId}`;

  const log = useMemo(
    () => logWithFlags.replace(FIRST_LINE_REGEX, ""),
    [logWithFlags]
  );

  useEffect(() => {
    dispatch(setRawFlags(flags));
  }, [dispatch, flags]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={"Randomize the music in your FF6WC seed!"}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppHeader />
      <div className="flex flex-col gap-6 items-center px-12 py-6">
        <Card className="max-w-[1260px]" title={"Log"}>
          <CardColumn>
            <CodeBlock>{log}</CodeBlock>
          </CardColumn>
        </Card>

        <MusicSeedCard seed={seed} />
      </div>
      <MusicFooter />
    </>
  );
}
