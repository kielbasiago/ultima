import { ExperienceMagicPointsGold } from "~/card-components/ExperienceMagicPointsGold";
import { Scaling } from "~/card-components/Scaling";

export const Battle = () => {
  return (
    <div className="flex flex-row justify-center flex-wrap gap-6">
      <div className="flex-grow">
        <div className="flex flex-col gap-6">
          <ExperienceMagicPointsGold />
        </div>
      </div>
      <div className="flex-grow gap-6">
        <Scaling />
      </div>
    </div>
  );
};
