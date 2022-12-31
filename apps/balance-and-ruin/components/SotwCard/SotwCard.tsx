import { Button, Link } from "@ff6wc/ui";
import { SeedOfTheWeek } from "~/types/sotw";

type Props = {
  sotwId: string;
  sotw: SeedOfTheWeek;
};
export const SotwCard = ({ sotw, sotwId }: Props) => {
  return (
    <div className="flex flex-col gap-3 p-5 items-center border-1 w-fit px-16">
      <h2 className="text-3xl font-mono">SotW {sotwId}</h2>
      <h3>{sotw.name}</h3>
      <h3>Submitted by {sotw.submitter}</h3>

      <Link href={sotw.seed}>
        <Button className="w-fit" variant="primary">
          Play Seed
        </Button>
      </Link>
    </div>
  );
};
