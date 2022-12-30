import { useDispatch } from "react-redux";
import { FlagLabel } from "~/components/FlagLabel/FlagLabel";
import { Slider } from "@ff6wc/ui";
import { setObjective } from "~/state/objectiveSlice";
import { Objective } from "~/types/objectives";

export type ObjectiveConditionsRequiredProps = {
  objective: Objective;
  onChange: (val: Objective) => any;
};

export const ObjectiveConditionsRequired = ({
  objective,
  onChange,
}: ObjectiveConditionsRequiredProps) => {
  const { conditions, requiredConditions } = objective;
  const [minVal, maxVal] = requiredConditions;
  const max = conditions.length;
  const onRequirementsChange = (newRequirement: number[]) => {
    onChange({
      ...objective,
      requiredConditions: newRequirement as [number, number],
    });
  };
  return (
    <div className="flex flex-col gap-2">
      <div>
        <FlagLabel
          flag={objective.flag}
          helperText=""
          label="Required Conditions"
        />
      </div>
      <Slider
        min={0}
        max={max}
        step={1}
        onChange={(val) => onRequirementsChange(val)}
        range
        value={[minVal, maxVal]}
      />
    </div>
  );
};
