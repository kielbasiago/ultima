import { Link } from "@ff6wc/ui";
import { DISCORD_URL, SOTW_SUBMISSION_URL } from "@ff6wc/utils/constants";
import { AppHeader } from "~/components/AppHeader/AppHeader";
import { Footer } from "~/components/Footer/Footer";
import { SotwCard } from "~/components/SotwCard/SotwCard";
import { SeedOfTheWeek } from "~/types/sotw";

type Props = {
  children?: React.ReactNode;
  head: React.ReactNode;
  id: string;
  sotw: SeedOfTheWeek;
};

export const SotwPage = ({ head, id, sotw }: Props) => {
  return (
    <>
      {head}
      <AppHeader />

      <main className="flex flex-col w-full py-4 px-10 h-full text-center items-center">
        <div className="flex flex-col gap-4 max-w-[900px]">
          <h1 className="text-3xl md:text-5xl">Seed of the Week</h1>

          <p className="text-sm md:text-base">
            Seed of the Week (SotW) is weekly race and showcase of flags
            submitted by community members that change week-to-week. To submit
            your own flagset for Seed of the Week, use the&nbsp;
            <Link href={SOTW_SUBMISSION_URL}>form found here</Link>
          </p>

          <p className="text-sm md:text-base">
            Join the&nbsp;<Link href={DISCORD_URL}>Discord server</Link>&nbsp;to
            join the community and run SotW!
          </p>

          <SotwCard sotwId={id} sotw={sotw} />
        </div>
      </main>
      <Footer />
    </>
  );
};
