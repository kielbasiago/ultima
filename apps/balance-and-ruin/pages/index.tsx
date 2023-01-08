import { NextPage } from "next";
import Create, { getServerSideProps, PageProps } from "./create";

export { getServerSideProps };

const Home: NextPage<PageProps> = (props) => {
  return <Create {...props} />;
};

export default Home;

// import { AppNavigation } from "@ff6wc/ui";
// import { ff3Header, openSans } from "@ff6wc/utils/fonts";
// import { cx } from "cva";
// import type { GetStaticPropsContext, NextPage } from "next";
// import { AppLandingGridItem } from "~/components/AppLandingGridItem/AppLandingGridItem";
// import { AppLandingSection } from "~/components/AppLandingSection/AppLandingSection";
// import { Footer } from "~/components/Footer/Footer";
// import { SpriteDrawAnimation } from "~/components/SpriteDrawAnimation/SpriteDrawAnimation";

// export async function getStaticProps(context: GetStaticPropsContext) {
//   return {
//     props: {},
//   };
// }
// function NewLandingPage() {
//   return (
//     <div className="relative">
//       <AppNavigation />
//       <div className="WC-hero absolute top-0 bottom-0 left-0 right-0 bg-[url('/hero_main.png')] brightness-75 bg-no-repeat bg-cover bg-center z-[-1]"></div>
//       <header
//         className={cx(
//           openSans.className,
//           "relative w-full font-base splash-text py-4 px-8"
//         )}
//       >
//         <div
//           className={cx(
//             "w-full md:max-w-[720px] lg:max-w-[1140px] mx-auto z-10 "
//           )}
//         >
//           <div className="w-fit flex flex-col mt-2 mb-4 items-center">
//             <h1
//               className={cx(
//                 ff3Header.className,
//                 "main-header-text",
//                 "text-7xl lg:text-9xl  tracking-wide uppercase"
//               )}
//             >
//               Worlds Collide
//             </h1>
//             <div className="min-h-[5px] w-full bg-white" />
//             <h2
//               className={cx(
//                 "font-ff3 text-2xl lg:text-4xl main-text",
//                 "text-white"
//               )}
//             >
//               Final Fantasy VI Randomizer
//             </h2>
//           </div>
//           <p
//             className={cx(
//               "main-header-text",
//               "shadow-blue-700",
//               "mb-4 text-sm lg:text-lg"
//             )}
//           >
//             Worlds Collide (WC) is an open-world randomizer for Final Fantasy VI
//             on the SNES. Players begin aboard the airship and can travel freely
//             between the World of Balance and the World of Ruin to discover
//             characters, espers, and items before facing off against Kefka.
//           </p>
//           <p
//             className={cx(
//               "main-text",
//               "shadow-blue-700",
//               "mb-4 text-sm lg:text-lg"
//             )}
//           >
//             WC complete a full playthrough in one sitting
//           </p>

//           {/* <p className="flex gap-4 flex-wrap">
//             <ButtonLink className="w-fit" href="/sotw" variant="primary">
//               <SpriteDrawRandom />
//               <span>Seed of the Week</span>
//             </ButtonLink>
//             <DiscordButton variant="primary" />
//             <ButtonLink
//               className="w-fit min-h-[70px]"
//               variant="primary"
//               href={WIKI_URL}
//             >
//               <HiPencil size="36" />
//               Wiki
//             </ButtonLink>{" "}
//           </p> */}
//         </div>
//       </header>
//       <AppLandingSection title={"How It Works"}>
//         <AppLandingGridItem
//           title={
//             <>
//               <SpriteDrawAnimation
//                 delay={300}
//                 spriteId={13}
//                 paletteId={5}
//                 poses={[1, 0, 1, 2]}
//               />
//               <span className="px-4">Characters</span>
//             </>
//           }
//         >
//           Gather all 14 of the original cast members to rally against Kefka..
//           Yes, even Umaro..
//         </AppLandingGridItem>
//         <AppLandingGridItem
//           title={
//             <>
//               <SpriteDrawAnimation
//                 delay={150}
//                 spriteId={0}
//                 paletteId={2}
//                 poses={[16, 17]}
//               />
//               <span className="px-4">Magic</span>
//             </>
//           }
//         >
//           All the magic is randomized, and its thanks to the Empire putting
//           MiracleGro™ in our drinking water!
//         </AppLandingGridItem>
//       </AppLandingSection>
//       <Footer />
//     </div>
//   );
// }
