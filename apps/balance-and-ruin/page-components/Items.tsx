import { FlagNumberInput } from "~/components/FlagNumberInput/FlagNumberInput";

export const Items = () => {
  return (
    <div className="flex flex-row justify-center flex-wrap gap-6">
      <div className="flex-grow">
        <div className="flex flex-col gap-6">
          <FlagNumberInput flag="-gp" label="Starting Gold/Items" type="int" />
        </div>
      </div>
      <div className="flex-grow gap-6"></div>
    </div>
  );
};
