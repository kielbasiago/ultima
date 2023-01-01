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
        "flex flex-col gap-3 p-5 items-center border-1 w-fit px-16",
        roboto.className
      )}
    >
      <h2 className="text-3xl font-mono">
        SotW {sotwId} - {sotw.name}
      </h2>
      <p className="text-sm">Submitted by {sotw.submitter}</p>
      <p className="text-base">{sotw.description}</p>

      <Link href={sotw.seed}>
        <Button className="w-fit" variant="primary">
          Play Seed
        </Button>
      </Link>
    </div>
  );
};
