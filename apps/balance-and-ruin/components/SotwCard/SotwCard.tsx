import { Button, Link } from "@ff6wc/ui";
import { cx } from "cva";
import { roboto } from "@ff6wc/utils/fonts";
import { SeedOfTheWeek } from "~/types/sotw";

type Props = {
  sotwId: string;
  sotw: SeedOfTheWeek;
};
export const SotwCard = ({ sotw, sotwId }: Props) => {
  return (
    <div
      className={cx(
        "flex flex-col gap-3 items-center border-1 p-4",
        roboto.className
      )}
    >
      <h2 className="pt-5 px-4 text-2xl font-mono">SotW {sotwId}</h2>
      <h2 className="text-3xl px-4 font-mono font-bold">{sotw.name}</h2>
      <p className="text-sm px-4">Submitted by {sotw.submitter}</p>
      <p className="text-base px-2">{sotw.description}</p>

      <Link href={sotw.seed}>
        <Button
          className="w-fit uppercase font-mono font-semibold"
          variant="primary"
        >
          Play Seed
        </Button>
      </Link>
    </div>
  );
};
