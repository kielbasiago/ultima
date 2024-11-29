import { Button, DiscordButton, Link } from "@ff6wc/ui";
import { cx } from "cva";
import { SeedOfTheWeek } from "~/types/sotw";

type Props = {
  sotwId: string;
  sotw: SeedOfTheWeek;
};
export const SotwCard = ({ sotw, sotwId }: Props) => {
  const { seed_id, seed } = sotw;
  return (
    <div
      className={cx(
        "flex flex-col gap-3 items-center border-1 p-4 mt-8 card-fancy-gradient"
      )}
    >
      <h2 className="px-4 text-2xl font-mono">SotW {sotwId}</h2>
      <h2 className="text-3xl px-4 font-mono font-bold">{sotw.name}</h2>
      <p className="text-sm px-4">Submitted by {sotw.submitter}</p>
      <p className="text-base px-2">{sotw.description}</p>

      <Link href={seed_id ? `/seed/?id=${seed_id}` : seed}>
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
