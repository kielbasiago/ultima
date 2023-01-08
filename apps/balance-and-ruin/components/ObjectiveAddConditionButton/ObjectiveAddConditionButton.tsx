import { Button } from "@ff6wc/ui";
import { useDispatch, useSelector } from "react-redux";
import { setFlag, useFlagValueSelector } from "~/state/flagSlice";
import {
  MAX_CONDITION_COUNT,
  selectObjectiveConditionMetadataById,
  selectObjectiveResultMetadataById,
  selectObjectives,
  setObjective,
} from "~/state/objectiveSlice";
import { Objective, ObjectiveCondition } from "~/types/objectives";
import { objectiveToString } from "~/utils/objectiveToString";

type ObjectiveCardProps = {
  objective: Objective;
};

export const ObjectiveAddConditionButton = ({
  objective,
}: ObjectiveCardProps) => {
  const { flag } = objective;
  const dispatch = useDispatch();
  const objectivesByFlag = useSelector(selectObjectives) ?? {};
  const resultMetadata = useSelector(selectObjectiveResultMetadataById);
  const conditionMetadata = useSelector(selectObjectiveConditionMetadataById);
  const value = useFlagValueSelector<string>(flag)?.split(".") ?? [];

  const addObjectiveCondition = () => {
    if (objective.conditions.length >= MAX_CONDITION_COUNT) {
      return;
    }
    const RANDOM_ID = "1";
    const cMetadata = conditionMetadata[RANDOM_ID];
    const newObjective = { ...objective };
    const conditions = [...objective.conditions];
    const newCondition: ObjectiveCondition = {
      id: RANDOM_ID,
      name: cMetadata.condition_type_name,
      range: cMetadata.range,
      values: [cMetadata.value_range[0]],
    };

    conditions.push(newCondition);
    newObjective.conditions = conditions;
    newObjective.requiredConditions = [
      objective.requiredConditions[0] + 1,
      objective.requiredConditions[1] + 1,
    ];

    dispatch(setObjective(newObjective));

    dispatch(
      setFlag({
        flag,
        value: objectiveToString(newObjective),
      })
    );
  };

  return (
    <Button
      className="w-fit"
      disabled={objective.conditions.length >= MAX_CONDITION_COUNT}
      onClick={addObjectiveCondition}
      size="small"
      variant="primary"
    >
      Add Condition
    </Button>
  );
};
