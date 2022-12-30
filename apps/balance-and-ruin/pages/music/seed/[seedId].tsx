import { cva } from "cva";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { PropsWithChildren, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { Footer } from "~/components/Disclaimer/Disclaimer";
import { Header } from "@ff6wc/ui";
import { MusicSeedCard } from "~/components/MusicSeedCard/MusicSeedCard";
import { SeedData } from "~/components/SeedCard/SeedCard";
import { Card } from "@ff6wc/ui";
import { setRawFlags } from "~/state/flagSlice";

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
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  const { seedId } = params as PathParams;
  const url = `${protocol}://${process.env.VERCEL_URL}/api/seed/ff6wc/${seedId}`;
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

const codeBlock = cva([
  "text-sm",
  "max-h-[600px] bg-gray-200 p-4",
  "whitespace-pre-wrap font-mono break-words box-decoration-clone",
  "overflow-auto",
]);

const CodeBlock = ({ children }: PropsWithChildren) => (
  <code className={codeBlock()}>{children}</code>
);

export default function SeedId({ seed, seedId }: Props) {
  const dispatch = useDispatch();
  const { flags, log, patch } = seed;

  const title = `FF6WC music seed ${seedId}`;

  useEffect(() => {
    dispatch(setRawFlags(flags));
  }, [dispatch, flags]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={"Randomize the music of your FF6WC seed using Johnnydmad"}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex flex-col gap-6 items-center px-12 py-6">
        <Card className="max-w-[1200px]" title={"Log"}>
          <CardColumn>
            <CodeBlock>{log}</CodeBlock>
          </CardColumn>
        </Card>

        <MusicSeedCard seed={seed} />
      </div>
      <Footer />
    </>
  );
}
