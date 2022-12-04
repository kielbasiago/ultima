import { StartingGoldAndItems } from "~/card-components/StartingGoldAndItems";

export const Items = () => {
  return (
    <div className="flex flex-row justify-center flex-wrap gap-6">
      <div className="flex-grow">
        <div className="flex flex-col gap-6">
          <StartingGoldAndItems />
        </div>
      </div>
      <div className="flex-grow gap-6"></div>
    </div>
  );
};
