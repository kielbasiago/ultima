import { DiscordButton, Link } from "@ff6wc/ui";
import { DISCORD_URL, SOTW_SUBMISSION_URL } from "@ff6wc/utils/constants";
import { cx } from "cva";
import { openSans } from "~/../../packages/utils/fonts";
import { AppHeader } from "~/components/AppHeader/AppHeader";
import { Footer } from "~/components/Footer/Footer";
import { SotwCard } from "~/components/SotwCard/SotwCard";
import { SeedOfTheWeek } from "~/types/sotw";

type Nullable<T> = T | null;
type Props = {
  children?: React.ReactNode;
  head: React.ReactNode;
  id: string;
  sotw: Nullable<SeedOfTheWeek>;
};

export const SotwPage = ({ head, id, sotw }: Props) => {
  return (
    <>
      {head}
      <AppHeader />

      <main
        className={cx(
          openSans.className,
          "flex flex-col w-full py-4 px-10 h-fit text-center items-center"
        )}
      >
        <div className="flex flex-col gap-4 max-w-[900px]">
          <h1 className="text-3xl md:text-5xl">Seed of the Week</h1>

          <p className="text-sm md:text-base">
            Seed of the Week (SotW) is a casual weekly race and used as a
            showcase of different flagsets submitted by the by community.
          </p>

          <p className="text-sm md:text-base">
            Join the&nbsp;<Link href={DISCORD_URL}>Discord server</Link>&nbsp;to
            play alongside the community and to submit your own ideas for the Seed of The Week!
          </p>
          { sotw && <SotwCard sotwId={id} sotw={sotw} /> }
        </div>
      </main>
      <Footer />
    </>
  );
};

//          