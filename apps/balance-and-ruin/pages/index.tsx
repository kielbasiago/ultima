import { ff3Header, openSans } from "@ff6wc/utils/fonts";
import { cx } from "cva";
import type { GetStaticPropsContext, NextPage } from "next";
import { AppLandingGridItem } from "~/components/AppLandingGridItem/AppLandingGridItem";
import { AppLandingSection } from "~/components/AppLandingSection/AppLandingSection";
import { Footer } from "~/components/Footer/Footer";
import { AppNavigation } from "@ff6wc/ui";
import { SpriteDrawAnimation } from "~/components/SpriteDrawAnimation/SpriteDrawAnimation";
import Create, { getServerSideProps, PageProps } from "./create";

// export async function getStaticProps(context: GetStaticPropsContext) {
//   return {
//     props: {},
//   };
// }

export { getServerSideProps };

const Home: NextPage<PageProps> = (props) => {
  return <Create {...props} />;
  // return (
  //   <div className="relative">
  //     <AppNavigation />
  //     <div className="WC-hero absolute top-0 bottom-0 left-0 right-0 bg-[url('/hero_main.png')] brightness-75 bg-no-repeat bg-cover bg-center z-[-1]"></div>
  //     <header
  //       className={cx(
  //         openSans.className,
  //         "relative w-full font-base splash-text py-4 px-8"
  //       )}
  //     >
  //       <div
  //         className={cx(
  //           "w-full md:max-w-[720px] lg:max-w-[1140px] mx-auto z-10 "
  //         )}
  //       >
  //         <div className="w-fit flex flex-col mt-2 mb-4 items-center">
  //           <h1
  //             className={cx(
  //               ff3Header.className,
  //               "main-header-text",
  //               "text-7xl lg:text-9xl  tracking-wide uppercase"
  //             )}
  //           >
  //             Worlds Collide
  //           </h1>
  //           <div className="min-h-[5px] w-full bg-white" />
  //           <h2
  //             className={cx(
  //               "font-ff3 text-2xl lg:text-4xl main-text",
  //               "text-white"
  //             )}
  //           >
  //             Final Fantasy VI Randomizer
  //           </h2>
  //         </div>
  //         <p
  //           className={cx(
  //             "main-header-text",
  //             "shadow-blue-700",
  //             "mb-4 text-sm lg:text-lg"
  //           )}
  //         >
  //           Final Fantasy VI: Worlds Collide is an open-world randomizer.
  //           Instead of progressing through the story as normal, you instead
  //           start on The Blackjack, the game&apos;s starting airship.
  //         </p>
  //         <p
  //           className={cx(
  //             "main-text",
  //             "shadow-blue-700",
  //             "mb-4 text-sm lg:text-lg"
  //           )}
  //         >
  //           Travel between past and present worlds to unlock the key to
  //           defeating Kefka and save the world once again with a new experience
  //           each time!
  //         </p>

  //         {/* <p className="flex gap-4 flex-wrap">
  //           <ButtonLink className="w-fit" href="/sotw" variant="primary">
  //             <SpriteDrawRandom />
  //             <span>Seed of the Week</span>
  //           </ButtonLink>
  //           <DiscordButton variant="primary" />
  //           <ButtonLink
  //             className="w-fit min-h-[70px]"
  //             variant="primary"
  //             href={WIKI_URL}
  //           >
  //             <HiPencil size="36" />
  //             Wiki
  //           </ButtonLink>{" "}
  //         </p> */}
  //       </div>
  //     </header>
  //     <AppLandingSection title={"How It Works"}>
  //       <AppLandingGridItem
  //         title={
  //           <>
  //             <SpriteDrawAnimation
  //               delay={300}
  //               spriteId={13}
  //               paletteId={5}
  //               poses={[1, 0, 1, 2]}
  //             />
  //             <span className="px-4">Characters</span>
  //           </>
  //         }
  //       >
  //         Gather all 14 of the original cast members to rally against Kefka..
  //         Yes, even Umaro..
  //       </AppLandingGridItem>
  //       <AppLandingGridItem
  //         title={
  //           <>
  //             <SpriteDrawAnimation
  //               delay={150}
  //               spriteId={0}
  //               paletteId={2}
  //               poses={[16, 17]}
  //             />
  //             <span className="px-4">Magic</span>
  //           </>
  //         }
  //       >
  //         All the magic is randomized, and its thanks to the Empire putting
  //         MiracleGro™ in our drinking water!
  //       </AppLandingGridItem>
  //     </AppLandingSection>
  //     <Footer />
  //   </div>
  // );
};

export default Home;
