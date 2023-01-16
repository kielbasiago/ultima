import { ButtonLink, DiscordButton } from "@ff6wc/ui";
import { openSans } from "~/pages/_app";
import { cva, cx } from "cva";
import type { GetStaticPropsContext, NextPage } from "next";
import { HiPencil } from "react-icons/hi2";
import { WIKI_URL } from "@ff6wc/utils/constants";
import { AppLandingGridItem } from "~/components/AppLandingGridItem/AppLandingGridItem";
import { AppLandingSection } from "~/components/AppLandingSection/AppLandingSection";
import { HomeFooter } from "~/components/Footer/Footer";
import { SotwButton } from "~/components/SotwButton/SotwButton";
import { SpriteDrawAnimation } from "~/components/SpriteDrawAnimation/SpriteDrawAnimation";
import Head from "next/head";

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {},
  };
}

const button = cva(["w-fit max-w-[500px] min-h-[70px] inline-flex"]);

export default function NewLandingPage() {
  return (
    <>
      <Head>
        <title>FF6WC</title>
        <meta
          name="description"
          content="Final Fantasy VI open-world randomizer"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="/runiccondensed.ttf"
          as="font"
          crossOrigin=""
          type="font/ttf"
        />
        <link
          rel="preload"
          href="/final_fantasy_36_font.ttf"
          as="font"
          crossOrigin=""
          type="font/ttf"
        />
      </Head>
      <div className="flex flex-col h-screen relative">
        {/* <AppNavigation /> */}
        <div className="WC-hero absolute top-0 bottom-0 left-0 right-0 bg-[url('/hero_main.png')] brightness-75 bg-no-repeat bg-cover bg-center z-[-1]"></div>
        <header
          className={cx(
            openSans.className,
            "relative w-full font-base splash-text py-4 px-8"
          )}
        >
          <div
            className={cx(
              "w-full md:max-w-[720px] lg:max-w-[1140px] mx-auto z-10 "
            )}
          >
            <div className="w-fit flex flex-col mt-2 mb-4 items-center">
              <h1
                className={cx(
                  "font-header",
                  "main-header-text",
                  "text-7xl lg:text-9xl  tracking-wide uppercase"
                )}
              >
                Worlds Collide
              </h1>
              <div className="min-h-[5px] w-full bg-white" />
              <h2
                className={cx(
                  "font-ff3 text-2xl lg:text-4xl main-text",
                  "text-white"
                )}
              >
                Final Fantasy VI Randomizer
              </h2>
            </div>
            <div
              className={cx(
                "main-header-text",
                "shadow-blue-700",
                "mb-4 text-sm lg:text-lg"
              )}
            >
              Worlds Collide (WC) is an open-world randomizer for Final Fantasy
              VI on the SNES. Players begin aboard the airship and can travel
              freely between the World of Balance and the World of Ruin to
              discover characters and espers. Once you&apos;ve gathered enough,
              you can face off against Kefka
            </div>
            <div
              className={cx(
                "main-text",
                "shadow-blue-700",
                "mb-4 text-sm lg:text-lg"
              )}
            >
              Options within WC include options to randomize characters,
              commands, espers, treasure, shops and more with over 200 flags to
              customize each playthrough
            </div>
          </div>
        </header>
        <AppLandingSection title={"Getting Started"}>
          <AppLandingGridItem
            title={
              <>
                <SpriteDrawAnimation
                  delay={150}
                  spriteId={5}
                  paletteId={0}
                  poses={[16, 17]}
                />
                <span className="px-4">Discord</span>
              </>
            }
          >
            <div className="text-center">
              Join our Discord server to talk with the community and learn about
              the latest news and events
            </div>
            <div>
              <DiscordButton />
            </div>
          </AppLandingGridItem>
          <AppLandingGridItem
            title={
              <>
                <SpriteDrawAnimation
                  delay={150}
                  spriteId={21}
                  paletteId={3}
                  poses={[29, 30]}
                />
                <span className="px-4">Seed of the Week</span>
              </>
            }
          >
            <div className="text-center">
              Play a weekly seed submitted by a community member. You can post
              your time in the discord and see how you compare to others!
            </div>
            <SotwButton />
          </AppLandingGridItem>
          <AppLandingGridItem
            title={
              <>
                <SpriteDrawAnimation
                  delay={300}
                  spriteId={15}
                  paletteId={0}
                  poses={[25, 25, 26]}
                />
                <span className="px-4">Wiki</span>
              </>
            }
          >
            <div className="text-center">
              Visit the wiki for guides, resources, and how to get the most out
              of WC
            </div>

            <ButtonLink
              className="w-fit min-h-[70px]"
              href={WIKI_URL}
              variant="primary"
            >
              <HiPencil size="36" />
              Wiki
            </ButtonLink>
          </AppLandingGridItem>

          <AppLandingGridItem
            title={
              <>
                <SpriteDrawAnimation
                  delay={300}
                  spriteId={0}
                  paletteId={74}
                  poses={[1, 0, 1, 2]}
                />
                <span className="px-4">Randomizer</span>
              </>
            }
          >
            <div className="text-center">
              Generate a random seed and begin to play Worlds Collide
            </div>
            <ButtonLink className={button()} href="/create" variant="primary">
              <div>Customize</div>
            </ButtonLink>
          </AppLandingGridItem>
        </AppLandingSection>
        <HomeFooter />
      </div>
    </>
  );
}
