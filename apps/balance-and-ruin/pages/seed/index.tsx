import Head from "next/head";
import { useEffect, useState } from "react";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { Footer } from "~/components/Footer/Footer";
import { CodeBlock } from "@ff6wc/ui";
import { SeedCard, SeedData } from "~/components/SeedCard/SeedCard";
import { Card } from "@ff6wc/ui";
import { AppHeader } from "~/components/AppHeader/AppHeader";

const REMOVE_FLAGS_FROM_LOG_REGEX = /\nFlags.+\n/g;

const SeedId = () => {
  const [seed, setSeed] = useState(null)
  const [logWithFlags, setLogWithFlags] = useState("")
  const [seedId, setSeedId] = useState("")
  const title = `FF6WC seed ${seedId}`

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search)
    const seedIdParam = queryParameters.get("id")
    if(seedIdParam) {
      setSeedId(seedIdParam)
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/seed/ff6wc/${seedIdParam}`
      fetch(url)
        .then((res) => res.json())
        .then(({data: seed, errors}) => {
          if(seed) {
            setSeed(seed)
            setLogWithFlags(seed.log.replace(REMOVE_FLAGS_FROM_LOG_REGEX, "\n"))
          } else {
            setLogWithFlags(`Error retrieving seed: ${errors}`)
          }
        })
    } else {
      setLogWithFlags("No id given; access this page with ?id=XYZ (where XYZ is a generated seed id)")
    }
  }, [])

  
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppHeader />
      <div className="flex flex-col gap-6 items-center px-12 py-6">
        <Card className="max-w-[1260px]" title={"Log"}>
          <CardColumn>
            <CodeBlock>
              { logWithFlags ? logWithFlags : "Loading..."}
            </CodeBlock>
          </CardColumn>
        </Card>

        {seed && 
          <SeedCard seed={seed} />
        }
      </div>
      <Footer />
    </>
  );
}

export default SeedId;
